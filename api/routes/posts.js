const express = require("express");
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

module.exports = router;
