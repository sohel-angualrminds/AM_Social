const mongoose = require('mongoose');

const profile_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    image: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    countryCode: {
        type: String
    },
    userID: {
        type: String,
        required: true
    }
});


const profilemodel = mongoose.model('PROFILE', profile_schema);
module.exports = profilemodel;