const router = require('express').Router();
const Post = require('../db/models/Post');
const Comment = require('../db/models/Comment');

const { isValidObjectId } = require('mongoose');

// create a comment
router.post('/new', async (req, res) => {
	try {
		const { parent, userId, content } = req.body;

		if (!isValidObjectId(parent?.id))
			return res.status(401).json('Invalid parent id');

		if (!isValidObjectId(userId))
			return res.status(401).json('Invalid user id');

		let newCommentDocument = new Comment({
			content,
			parent: { parentDetails: parent?.id, parentType: parent?.type },
			author: userId,
		});

		await newCommentDocument.save();

		if (parent?.type === 'post') {
			await Post.findByIdAndUpdate(parent?.id, {
				$push: { comments: newCommentDocument._id },
			});
		}

		if (parent?.type === 'comment') {
			await Comment.findByIdAndUpdate(parent?.id, {
				$push: { replies: newCommentDocument._id },
			});
		}

		return res.status(200).json({
			message: 'comment successfully added',
			comment: newCommentDocument,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
});

// get a single comment
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) return res.status(401).json('Invalid Comment ID');

		const comment = await Comment.findById(id);

		if (!comment) return res.status(404).json('Comment not found');

		res.status(200).json({ comment });
	} catch (error) {
		res.status(500).json(error);
	}
});

// get a list of comments
router.get('/', async (req, res) => {
	try {
		const comments = await Comment.find();

		res.status(200).json({ comments, count: comments.length });
	} catch (error) {
		res.status(500).json(error);
	}
});

// delete a comment : Neil
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { author } = req.body;

		if (!isValidObjectId(id)) return res.status(401).json('Invalid comment id');

		if (!isValidObjectId(author))
			return res.status(401).json('Invalid author id');

		const comment = await Comment.findById(id);

		if (!comment) return res.status(404).json('Comment not found');

		if (!comment.author.equals(author))
			return res.status(401).json('Only author can delete this comment');

		comment.isDeleted = true;
		comment.deleted = { at: Date.now(), by: author };

		await comment.save();

		res.status(200).json('comment deleted');
	} catch (error) {
		res.status(500).json(error);
	}
});

// upvote/ downvote a comment
router.put('/votes/:commentId', async (req, res) => {
	try {
		const { commentId } = req.params;
		const { userId } = req.body;

		if (!isValidObjectId(commentId) || !isValidObjectId(userId))
			return res.status(401).json({ error: 'Invalid request!' });

		const comment = await Comment.findById(commentId);
		const userIdx = comment.upvotes.indexOf(userId);

		if (userIdx !== -1) {
			comment.upvotes.splice(userIdx, 1);
		} else {
			comment.upvotes.push(userId);
		}
		comment.save();

		res.status(200).json({ comment });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error?.message });
	}
});

module.exports = router;
