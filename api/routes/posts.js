const express = require("express");
const router = express.Router();
const Post = require("../db/models/Post");

router.get("/", async (req, res) => {
  try {
    const { limit = 10, search_q = "", page = 1, tags = "" } = req.query;

    page--;

    let tagArray = tags.split(",");

    let posts;
    let postsForATag;
    for (let i = 0; i < tagArray.length; i++) {
      postsForATag = await Post.find({
        title: { $search: search_q },
        tags: { $in: tagArray },
      })
        .sort({ createdAt: -1 })
        .skip(parseInt(page) * parseInt(limit))
        .limit(parseInt(limit));
      posts.push(postsForATag);
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
