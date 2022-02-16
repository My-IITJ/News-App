const router = require("express").Router();
const Post = require("../db/models/Post");
const { isValidObjectId } = require("mongoose");
const upload = require("../middlewares/multer");
const { newPostValidator, validate } = require("../middlewares/validators");

//create a new Post : Sakshi
router.post(
  "/new",
  upload.single("thumbnail"),
  newPostValidator,
  validate,
  async (req, res) => {
    try {
      const { author, content, tags, visibility } = req.body;
      const post = { author, content, tags, visibility };

      if (req.file) {
        post.thumbnail = req.file?.filename;
      }

      const newPost = new Post(post);
      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// fetch a list of posts: shivam
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
        tags: { $contains: tagArray[i] },
      })
        .sort({ createdAt: -1 })
        .skip(parseInt(page) * parseInt(limit))
        .limit(parseInt(limit));
      posts.push(postsForATag);
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// fetch a single post: riyanshu
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post: chirag
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  if (!isValidObjectId(id))
    return res.status(401).json({ error: "Invalid request!" });

  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ error: "Post not found!" });

  post.isdeleted = true;
  post.deleted = { at: Date.now(), by: userId };

  try {
    await post.save();
    res.status(200).json({ message: "Post Deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
