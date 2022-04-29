//express
const express = require('express');
const app = express();
app.use(express.json());
const profileRouter = express.Router();
require('../DB/DB');
const fileUpload = require('../middleware/fileUpload');

profileRouter.put('/edit-profile', fileUpload, verifyToken,async (req, res) => {
    const { profileImage: image, name, bio, gender, dob:date, email,mobileNumber } = req.body;
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

    const 
    

})
