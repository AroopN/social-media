const express = require("express");
const router = express.Router();
let Post = require("../schemas/Post");
let User = require("../schemas/User");
const { check, validationResult } = require("express-validator");
const authentication = require("../middleware/authentication");
const { request } = require("express");

router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

router.get("/most_liked", async (req, res) => {
    try {
        const posts = await Post.find().sort({ likes: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});
router.get("/most_recent", async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: 1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});
router.get("/most_commented", async (req, res) => {
    try {
        const posts = await Post.find().sort({ comments: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});
router.get("/single_post/:post_id", async (req, res) => {
    try {
        const posts = await Post.findById(req.params.post_id);
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});
router.get("/user_posts/:user_id", async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.user_id });
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});
router.get("/user_posts", authentication, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});
router.post(
    "/add_post",
    [check("textOfPost", "Post cannot be empty !").not().isEmpty()],
    authentication,
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findById(req.user.id).select("-password");
            if (!user) {
                return res.status(401).json("User not found!");
            }
            let post = new Post({
                text: req.body.textOfPost,
                user: req.user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            });
            await post.save();
            res.json("Post successfully Added...");
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
        }
    }
);

router.post(
    "/add_post",
    [check("textOfPost", "Post cannot be empty !").not().isEmpty()],
    authentication,
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findById(req.user.id).select("-password");
            if (!user) {
                return res.status(401).json("User not found!");
            }
            let post = new Post({
                text: req.body.textOfPost,
                user: req.user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            });
            await post.save();
            res.json("Post successfully Added...");
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
        }
    }
);
router.post(
    "/add_post",
    [check("textOfPost", "Post cannot be empty !").not().isEmpty()],
    authentication,
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findById(req.user.id).select("-password");
            if (!user) {
                return res.status(401).json("User not found!");
            }
            let post = new Post({
                text: req.body.textOfPost,
                user: req.user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            });
            await post.save();
            res.json("Post successfully Added...");
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
        }
    }
);

router.put(
    "/search_post",
    [check("searchTerm", "Search cannot be empty !").not().isEmpty()],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let {searchTerm} = req.body
            searchTerm = searchTerm.toString().trim()
            let posts = await Post.find()
            if(searchTerm==null || searchTerm==""){
                res.json(posts)
            }
            posts = posts.filter((post)=> post.text.toString().toLowerCase().search(searchTerm)!=-1)
            res.json(posts);
        } catch (error) {
            console.error(error);
            return res.status(500).json("Server Error...");
        }
    }
);

router.put("/likes/:post_id", authentication, async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post) {
            res.status(404).send("Post Not Found");
        }
        if (
            post.likes.find(
                (like) => like.user.toString() == req.user.id.toString()
            )
        ) {
            return res.status(401).send("Post already liked");
        }
        let newLike = {
            user: req.user.id,
        };
        post.likes.push(newLike);
        await post.save();
        res.json("Post Liked!!");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});
router.put("/add_comment/:post_id",
check("commentText", "Comment cannot be empty").not().isEmpty(),
authentication, async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post) {
            res.status(404).send("Post Not Found");
        }
        let {commentText} = req.body
        let user = await User.findById(req.user.id.toString())
        let newComment = {
            user: user.id,
            nams : user.firstName + " "+user.lastName,
            text: commentText,
            avatar: user.avatar
        };
        console.log(req.user);
        console.log(user.id);
        post.comments.push(newComment);
        await post.save();
        res.json("Comment added!!");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});


router.put("/like_comment/:post_id/:comment_id", authentication, async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post) {
            res.status(404).send("Post Not Found");
        }
        let comment  = post.comments.find((comm)=> req.params.comment_id.toString() === comm.id.toString())
        if (!comment) {
            res.status(404).send("Comment Not Found");
        }
        console.log(comment)
        if (
            comment.likes.find(
                (like) => like.user.toString() == req.user.id.toString()
            )
        ) {
            return res.status(401).send("Comment already liked");
        }
        let newLike = {
            user: req.user.id,
        };
        comment.likes.push(newLike);
        await post.save();
        res.json("Comment Liked!!");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

router.delete("/delete_post/:post_id", 
authentication,
async(req, res) =>{
    try {
        let {post_id} = req.params 
        let post = await Post.findById(post_id)
        if (!post){
            return res.status(404).send("Post not found!!")
        }
        if(post.user.toString() != req.user.id.toString()){
            // console.log(post.user.toString())
            return res.status(403).send("Permission denied!!");
        }
        post.remove()
        res.json("Post succesfully deleted!!")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
})

module.exports = router;
