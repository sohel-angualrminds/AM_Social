//express
const express = require('express');
const app = express();
app.use(express.json());
const profileRouter = express.Router();
require('../DB/DB');
const verifyToken = require('../middleware/verifyToken');
const profile = require('../Model/profile');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'images',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now()
//             + (file.originalname))

//         // file.fieldname is name of the field (image)
//         // path.extname get the uploaded file extension
//     }
// });

// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//         fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//             // upload only png and jpg format
//             return cb(new Error('Please upload a Image'))
//         }
//         cb(undefined, true)
//     }
// })

// profileRouter.post('/', imageUpload.single('image'), (req, res) => {
//     res.send(req.file)
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })



profileRouter.put('/edit', upload.single('image'), async (req, res) => {
    try {
        // const { profileImage: image, name, bio, gender, dob: date, email, mobileNumber } = req.body;

        console.log(req.file);
        // const errorArray = [];
        // if (!name || !gender || !email) {
        //     if (!name)
        //         errorArray.push('name');

        //     if (!gender)
        //         errorArray.push('gender');

        //     if (!email)
        //         errorArray.push('email');

        //     return res.status(422).send({
        //         success: false,
        //         message: "please provide appropriate data",
        //         errorIn: JSON.stringify(errorArray)
        //     })
        // }
        // let newObj = {
        //     image: req.img,
        //     name,
        //     bio,
        //     gender,
        //     date,
        //     email,
        //     mobileNumber,
        //     userID: req.id
        // };
        // const result = await profile.findOneAndUpdate({ _id: req.id },
        //     { $set: newObj });
        // if (result) {
        //     return res.status(200).send({ success: true, message: "user update successfully" })
        // }
    } catch (err) {
        // return res.status(500).send({
        //     success: false,
        //     message: "internal error",
        //     error: JSON.stringify(err)
        // });
    }
})

<<<<<<< HEAD
    
    
=======
>>>>>>> f8c6230560d6a7cf7fb624f57aeb7a5ee95e75a9

module.exports = profileRouter;