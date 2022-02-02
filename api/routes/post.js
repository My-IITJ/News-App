const router = require("express").Router();
const Post = require("./models/Post");

// Fetch post
router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
} 
);

