const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({
    image: {
        type: String,
    },
    caption: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [
        {
            comment: {
                type: String
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            commenterID: {
                type: String
            },
        }
    ],
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    userINFO: {
        type: Object
    }
});


const postmodel = mongoose.model('POST', post_schema);
module.exports = postmodel;