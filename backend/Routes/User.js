const express = require('express');
const app = express();
app.use(express.json());
const UserRouter = express.Router();

//3) require DB Connection for getting connection
require('../DB/DB');
const User = require('../Model/user');
//importing this package for hashing our password
const bcrypt = require('bcrypt');
const { userValidation } = require('../middleware/validation');

//importing jwt for authentication
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

//generating new new tokens
const generateTokens = (user) => {
    return jwt.sign({ id: user._id, email: user.email, name: user.firstName },
        process.env.SECRETE_KEY,
        {
            expiresIn: "86400s"
        }
    );
}

/*
    USAGE : for user signin
    URL : http://localhost:7000/user/login
    Method : Post
    FIELDS : email,password
 */
UserRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Bad Request Please Provide Valid Credentials...'
            });
        }
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).send({
                success: false,
                message: 'User not exist!!!'
            })
        }
        else {
            //here we are checking if user already exist then we check hashed password is correct or not.            
            const isPasswordMatched = await bcrypt.compare(password, userExist.password);

            if (!isPasswordMatched) {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid Credential...!!!'
                })
            }
            else {
                //here we genrate users token and return that token to user
                const token = generateTokens(userExist);
                return res.status(200).send({
                    success: true,
                    message: "Login Succesfull.",
                    userInfo: {
                        email: userExist.email,
                        _id: userExist._id,
                        firstName: userExist.firstName,
                        lastName: userExist.lastName,
                    },
                    token
                });
            }
        }
    } catch (err) {
        console.log("Error in user login ", err);
        return res.status(500).send({
            success: false,
            message: 'login internal error',
        });
    }
});

/*
    USAGE : for user signup
    URL : http://localhost:7000/user/signup
    Method : Post
    FIELDS : firstName,lastName,password,email
 */
UserRouter.post('/signup', async (req, res) => {
    try {
        let { error } = userValidation(req.body);


        if (error) {
            return res.status(400).send({
                success: false,
                message: 'please provide valid info',
                error
            });
        }
        const { firstName, lastName, email, password } = req.body;
        const userExist = await User.findOne({ $or: [{ email: email }] });
        if (userExist) {
            return res.status(422).send({
                success: false,
                message: 'email already exist'
            });
        }

        let user = new User({ firstName, lastName, email, password });
        let result = user.save();
        if (!result) {
            return res.status(400).send({
                success: false,
                message: 'failed to save!'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'user register successfully',
        })

    } catch (err) {
        console.error("signup Error " + err);
        return res.status(500).send({ success: false, message: 'internal error', error: JSON.stringify(err), });
    }
});


/*
    USAGE : for password updae
    URL : http://localhost:7000/user/changepassword/:id
    Method : put
    FIELDS :oldPassword password confirmPassword 
 */
UserRouter.put('/changepassword/:id', verifyToken, async (req, res) => {
    try {

        if (req.id != req.params.id) {
            return res.status(400).send({
                success: false,
                message: "invalid user !"
            });
        }
        let userExist = await User.findOne({ _id: req.id });
        if (!userExist) {
            return res.status(404).send({
                success: false,
                message: "user not found!"
            });
        }
        const { oldPassword } = req.body;
        const isPasswordMatched = await bcrypt.compare(oldPassword, userExist.password);

        if (!isPasswordMatched) {
            return res.status(422).send({ success: false, message: "wrong old password" })
        }
        var validatePassword = function (pass) {
            var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
            return re.test(pass)
        };
        let { password, confirmPassword } = req.body;

        if (!validatePassword(password))
            return res.status(422).send({
                success: false,
                message: "password must content 1 Special Symbol 1 digit min length 6!"
            });

        if (password !== confirmPassword) {
            return res.status(422).send({
                success: false,
                message: "password and confirm password not matched!"
            });
        }
        password = await bcrypt.hash(password, 7);
        let result = await User.findOneAndUpdate({ _id: req.id }, {
            $set: {
                password: password
            }
        }, { new: true })

        if (result) {
            return res.status(200).send({ success: true, message: "password update succesfull" });
        } else {
            return res.status(404).send({ success: false, message: "failed to update", payloadFormat: "oldPassword password confirmPassword" });
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "failed to change",
            payloadFormat: "oldPassword password confirmPassword"
        })
    }
})



//Google Login
UserRouter.post("/google-login", async (req, res) => {
    try {
        // console.log(req.body.email)
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            const token = generateTokens(userExist);

            return res.status(200).send({
                success: true,
                message: "Login Succesfull.",
                userInfo: {
                    email: userExist.email,
                    _id: userExist._id,
                    firstName: userExist.firstName,
                    lastName: userExist.lastName,
                },
                token
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credential... please signup!!!'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'internal error !!!'
        })
    }
});


module.exports = UserRouter