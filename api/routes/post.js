const router = require('express').Router();
const Post = require('../db/models/Post');

// fetch a list of posts: shivam
router.get('/', async (req, res) => {
	try {
		const { limit = 10, search_q = '', page = 1, tags = [] } = req.query;

		let query = {};

		switch (key) {
			case value:
				break;

			default:
				break;
		}

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

module.exports = router;
