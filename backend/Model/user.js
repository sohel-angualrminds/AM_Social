const mongoose = require('mongoose');
//for adding bcrypt package
const bcrypt = require('bcrypt');

const user_schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

//bcrypt password using bcrypt data
user_schema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 7);
        // this.cpassword = await bcrypt.hash(this.cpassword, 7);
    }
    next();
});

const usermodel = mongoose.model('USER', user_schema);
module.exports = usermodel;