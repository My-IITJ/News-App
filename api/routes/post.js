const router = require('express').Router();
const Post = require('../db/models/Post');
const { isValidObjectId } = require('mongoose');
const upload = require('../middlewares/multer');
const {check} = require('express-validator');

//create a new Post : Sakshi
router.post('/newPost',upload.single('thumbnail'), async (req, res) => {
	try {
		const {author, content, tags, visibility} = req.body;
		const post = {author, content, tags, visibility};

		if(req.file){
			post.thumbnail = req.file.filename
		};

		check(post.author).trim().not().isEmpty().withMessage("Author is missing!");
		check(post.content).trim().not().isEmpty().withMessage("Content is missing!");
		check(post.visibility).trim().not().isEmpty().withMessage("Invalid visibility!");

		const newPost = new Post(post);
		await newPost.save();
		res.status(200).json(newPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

// fetch a list of posts: shivam
router.get('/', async (req, res) => {
	try {
		const { limit = 10, search_q = '', page = 1, tags = [] } = req.query;

		let query = {};

		let posts = await Post.find(query)
			.sort({ createdAt: -1 })
			.skip(parseInt(page) * parseInt(limit))
			.limit(parseInt(limit));

		res.json(posts);
	} catch (err) {
		console.error(err);
	}
});

// fetch a single post: riyanshu
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete a post: chirag
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const userId = req.body.userId;

	if (!isValidObjectId(id))
		return res.status(401).json({ error: 'Invalid request!' });

	const post = await Post.findById(req.params.id);

	if (!post) return res.status(404).json({ error: 'Post not found!' });

	post.isdeleted = true;
	post.deleted = { at: Date.now(), by: userId };

	try {
		await post.save();
		res.json({ message: 'Post Deleted successfully!' });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
