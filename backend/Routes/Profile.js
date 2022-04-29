//express
const express = require('express');
const app = express();
app.use(express.json());
const profileRouter = express.Router();
require('../DB/DB');
const fileUpload = require('../middleware/fileUpload');
const verifyToken = require('../middleware/verifyToken');
const profile = require('../Model/profile');

profileRouter.put('/edit', verifyToken, fileUpload, async (req, res) => {
    try {
        const { profileImage: image, name, bio, gender, dob: date, email, mobileNumber } = req.body;
        const errorArray = [];
        if (!name || !gender || !email) {
            if (!name)
                errorArray.push('name');

            if (!gender)
                errorArray.push('gender');

            if (!email)
                errorArray.push('email');

            return res.status(422).send({
                success: false,
                message: "please provide appropriate data",
                errorIn: JSON.stringify(errorArray)
            })
        }
        let newObj = {
            image: req.img,
            name,
            bio,
            gender,
            date,
            email,
            mobileNumber,
            userID: req.id
        };
        const result = await profile.findOneAndUpdate({ _id: req.id },
            { $set: newObj });
        if (result) {
            return res.status(200).send({ success: true, message: "user update successfully" })
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "internal error",
            error: JSON.stringify(err)
        });
    }
})


module.exports = profileRouter;