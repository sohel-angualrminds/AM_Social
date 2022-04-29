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
        type: Date,
        default: function () {
            if (!this.date) {
                return new Date().toISOString().split('T')[0];
            }
            return this.date;
        }
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minLength: 13
    },
    image: {
        type: String
    },
    userID: {
        type: String,
        required: true
    }
});


const profilemodel = mongoose.Model('USER', profile_schema);
module.exports = profilemodel;