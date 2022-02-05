const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const Post = require("../db/models/Post");

router.get("/", async (req, res) => {
  try {
    const { limit = 10, search_q = "", page = 1 } = req.query;

    let posts = await Post.find({ title: { $search: search_q } })
      .sort({ createdAt: -1 })
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit));

    res.json(posts);
  } catch (err) {
    console.error(err);
  }
});

router.patch(':/id', async(req, res) => {
  try{
    const {isdeleted, deleted} = req.body
    const {postId} = req.params

    if(!isValidObjectId(postId))
      return res.status(401).json({error: "Invalid request!"})
    
    const post = await Post.findById(req.params.id)

    if(!post)
      return res.status(404).json({error: "Post not found!"})

    post.isdeleted = isdeleted
    post.deleted = deleted

    await post.save()
    
  }catch(err){
    console.error(err)
  }
})

module.exports = router;
