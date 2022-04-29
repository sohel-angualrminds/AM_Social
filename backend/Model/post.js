const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({
    image: {
        type: String,
    },
    caption: {
        type: String,
    },
    likes: [
        {
            like: {
                type: String
            }
        }
    ],
    comments: [
        {
            comment: {
                type: String
            }
        }
    ],
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    }
});


const postmodel = mongoose.Model('POST', post_schema);
module.exports = postmodel;