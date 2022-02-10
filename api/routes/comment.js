const router = require("express").Router();
const Comment = require("../db/models/Comment");

const { isValidObjectId } = require("mongoose");

// create a comment
router.post("/:id/create", async (req, res) => {
  try {
    const { parent } = req.body;
    let userId = req.params.userId;

    if (!isValidObjectId(parent))
      return res.status(401).json("Invalid parent id");

    let newCommentDocument = new Comment({
      content: req.body.content,
      parent: parent,
      author: userId,
    });

    let commentData = await newCommentDocument.save();
    return res.status(200).send({
      message: "comment successfully added",
      data: commentData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a single comment
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) return res.status(401).json("Invalid Comment ID");

    const comment = await Comment.findById(id);

    if (!comment) return res.status(404).json("Comment not found");

    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a list of comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json({ comments, count: comments.length });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a comment : Neil
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { author } = req.body;

    if (!isValidObjectId(id)) return res.status(401).json("Invalid comment id");

    if (!isValidObjectId(author))
      return res.status(401).json("Invalid author id");

    const comment = await Comment.findById(id);

    if (!comment) return res.status(404).json("Comment not found");

    if (!comment.author.equals(author))
      return res.status(401).json("Only author can delete this comment");

    comment.isDeleted = true;
    comment.deleted = { at: Date.now(), by: author };

    await comment.save();

    res.status(200).json("comment deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
