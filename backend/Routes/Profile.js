//express
const express = require("express");
const app = express();
app.use(express.json());
const profileRouter = express.Router();
require("../DB/DB");
const verifyToken = require("../middleware/verifyToken");
const profile = require("../Model/profile");
const users = require("../Model/user");
const multer = require("multer");

//for image storage
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname);
  },
});

//checking image format and size
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("incorrect file format"), false);
  }
};

//created  object
const upload = multer({
  storage: Storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

//adding new data
const postData = async (data) => {
  const newdata = new profile(data);
  const result = await newdata.save();
  return result;
};

/*
    USAGE : for updating profile
    URL : http://localhost:7000/user/edit
    Method : put
    FIELDS : 
 */
profileRouter.put(
  "/edit",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
        const { image, name, bio, gender, dob: date, mobileNumber, countryCode } = req.body;
        const errorArray = [];
        if (!name || !gender || !mobileNumber.length == 10) {
            if (!name)
                errorArray.push('name');

            if (!gender)
                errorArray.push('gender');

            if (!mobileNumber.length == 10)
                errorArray.push('mobile Number should be in valid form');

            return res.status(422).send({
                success: false,
                message: "please provide appropriate data",
                errorIn: JSON.stringify(errorArray),
                backendFieldis: "image, name, bio, gender, dob,countryCode, mobileNumber"
            })
        }
        let result = null;
        let userExistProfile = await profile.findOne({ userId: req.id });

        if (userExistProfile) {
            let newObj = {
                name,
                bio,
                gender,
                date,
                mobileNumber,
                countryCode,
                userID: req.id
            };
            if (req.file && req.file.originalname)
                newObj.image = req.file.path;
            else
                newObj.image = '';

            result = await profile.findOneAndUpdate({ userId: req.id }, { $set: newObj });
            if (result)
                return res.status(200).send({ success: true, message: "user update successfully" });
            else
                return res.status(400).send({ success: false, message: "failed to update please try again later" });
        }
        else {
            let newObj = {
                name,
                bio,
                gender,
                date,
                mobileNumber,
                countryCode,
                userID: req.id
            };

            if (req.file && req.file.originalname)
                newObj.image = req.file.path;
            else
                newObj.image = '';

            let result1 = await postData(newObj);
            
            if (result1)
                return res.status(200).send({ success: true, message: "user update successfully" });
            else
                return res.status(400).send({ success: false, message: "failed to update please try again later" });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "internal error",
            backendFieldis: "image, name, bio, gender, dob,countryCode, mobileNumber also provide",
            error: error,
        });
    }
  }
);

/*
    USAGE : for getting perticular profile  info
    URL : http://localhost:7000/user/id
    Method : get
    FIELDS : 
 */
profileRouter.get("/user/:id", verifyToken, async (req, res) => {
  try {
    if (req.params.id == req.id) {
      const result = await profile.findOne({ userID: req.params.id });

      if (result) {
        return res.status(200).send({
          success: true,
          message: "user found",
          data: result,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: "user not have any profile please provide profile info",
        });
      }
    } else {
      res.status(401).send({
        success: false,
        message: "Invalid User !!",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "internal Error !!",
    });
  }
});

module.exports = profileRouter;
