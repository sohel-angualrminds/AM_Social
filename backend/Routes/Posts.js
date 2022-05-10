//express
const express = require('express');
const app = express();
app.use(express.json());

require('../DB/DB');
//post model
const post_router = express.Router();
const Post_Model = require('../Model/post');
//verifying token
const verifyToken = require('../middleware/verifyToken');
const provideInfo = require('../middleware/provideInfo');
const paginatedResults = require('../middleware/Pagination');
//uploading img
const multer = require('multer');


//image storage and filename
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/posts");
    },
    filename: function (req, file, cb) {
        cb(null, req.id + '_' + Date.now() + (file.originalname))
    }
});

//checking image format 
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("incorrect file format"), false)
    }
};


const uploadPostImg = multer({
    storage: Storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
})

/*
    USAGE : for adding new Post
    URL : http://localhost:7000/feed/addPost
    Method : post
    FIELDS : image,caption
 */

post_router.post('/addPost', verifyToken, uploadPostImg.single('image'), provideInfo, async (req, res) => {
    try {
        const { image, caption } = req.body;
        let newObj = {
            image: req.file.path,
            caption: caption,
            userINFO: {
                userID: req.id,
                firstName: req.firstName,
                lastName: req.lastName,
                email: req.email
            },
            comments: [],
            likes: [],
            likesCount: 0,
            commentsCount: 0
        };

        const new_post = new Post_Model(newObj);
        const result = await new_post.save();

        if (!result) {
            return res.status(400).send({
                success: false,
                message: "failed to update !",
                payload: newObj
            })
        }
        return res.status(201).send({
            success: true,
            message: "post uploaded successfully",
            data: result,
        });


    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "internal error!",
            error: " " + err + " "
        })
    }
});

/*
    USAGE : for getting all posts
    URL : http://localhost:7000/feed/
    Method : get
    FIELDS : 
*/
post_router.get('/', verifyToken, paginatedResults(Post_Model), async (req, res) => {
    try {
        //http://localhost:7000/feed?page=1&limit=14
        let posts = res.paginatedResults;
        return res.status(200).send({
            success: true,
            message: "all posts",
            data: posts
        })
    } catch (err) {
        console.log("" + err)
        return res.status(500).send({
            success: false,
            message: "internal error!",
            error: " " + err + " "
        })
    }
})


/*
    USAGE : for getting perticular users posts
    URL : http://localhost:7000/feed/
    Method : get
    FIELDS : 
*/
post_router.get('/:id', verifyToken, async (req, res) => {
    try {
        if (req.id == req.params.id) {
            let result = await Post_Model.find({ userID: req.id });
            return res.status(200).send({
                success: true,
                message: "request successfull",
                data: result
            })
        } else {
            return res.status(401).send({
                success: false,
                message: "unauthorized user...!",
            })

        }
    } catch (err) {
        console.log("" + err)
        return res.status(500).send({
            success: false,
            message: "internal error!",
            error: " " + err + " "
        })
    }
})


/*
    USAGE : for putting comments on perticular  post
    URL : http://localhost:7000/feed/comment/:id
    Method : put
    FIELDS : 
*/
post_router.put('/comment/:id', verifyToken, provideInfo, async (req, res) => {
    try {

        let { comment } = req.body;
        let newComment = {
            firstName: req.firstName,
            lastName: req.lastName,
            commenterID: req.id,
            comment,
        }

        let result = await Post_Model.findOneAndUpdate({ _id: req.params.id }, {
            $push: {
                comments: newComment
            }
        },
            { new: true });

        if (result) {
            let result2 = await Post_Model.findOneAndUpdate({ _id: req.params.id },
                {
                    $set: {
                        commentsCount: result.comments.length
                    }
                }
                ,
                { new: true }
            );
            if (!result2) {
                return res.status(404).send({
                    success: false,
                    message: "adding comment failed",
                })
            }
            return res.status(201).send({
                success: true,
                message: "comment added",
                data: result2
            })
        }
        else {
            return res.status(404).send({
                success: false,
                message: "post not found",
            })
        }


    } catch (err) {
        console.log("" + err)
        return res.status(500).send({
            success: false,
            message: "internal error!",
            error: " " + err + " "
        })
    }
})

/*
    USAGE : for putting comments on perticular  post
    URL : http://localhost:7000/feed/like/:id
    Method : put
    FIELDS : 
*/

post_router.put('/like/:id', verifyToken, provideInfo, async (req, res) => {
    try {
        const post = await Post_Model.findById({ _id: req.params.id });

        if (!post.likes.includes(req.id)) {
            await post.updateOne({ $push: { likes: req.id } });

            let s = await Post_Model.findOne({ _id: req.params.id }); s
            let r = await Post_Model.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    likesCount: s.likes.length
                }
            },
                { new: true }
            )

            res.status(200).send({ success: true, message: "The post has been liked", likeCount: r.likesCount, data: r });
        } else {
            await post.updateOne({ $pull: { likes: req.id } });
            let s = await Post_Model.findOne({ _id: req.params.id });
            let r = await Post_Model.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    likesCount: s.likes.length
                }
            },
                { new: true }
            )
            res.status(200).send({ success: true, message: "The post has been disliked", likeCount: r.likesCount, data: r });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});



module.exports = post_router;

