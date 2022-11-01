const router = require('express').Router();
const Post = require('../db/models/Post');
const Comment = require('../db/models/Comment');
const Tag = require('../db/models/Tag');
const User = require('../db/models/User');
const { isValidObjectId } = require('mongoose');
const upload = require('../middlewares/multer');
const subDays = require('date-fns/subDays');
const cloudinary = require('../cloud');
const { newPostValidator, validate } = require('../middlewares/validators');
const { checkIfAuthenticated } = require('../middlewares/authenticate');

//create a new Post : Sakshi
router.post(
	'/new',
	upload.single('thumbnail'),
	newPostValidator,
	validate,
	async (req, res) => {
		console.log('first');
		try {
			let { author, content, tags, visibility, image } = req.body;

			const allTags = await Tag.find();

			tags = tags.map((i) => {
				return allTags.find(
					(item) => item.name.toLowerCase() === i.toLowerCase()
				)._id;
			});

			const post = { author, content, tags, visibility, thumbnail: image };

			if (req.file) {
				const { secure_url, public_id, width, height } =
					await cloudinary.uploader.upload(req.file.path);
				post.thumbnail = { url: secure_url, public_id, width, height };
			}

			const newPost = new Post(post);
			await newPost.save();

			await User.findByIdAndUpdate(author, { $push: { posts: newPost._id } });

			res.status(200).json({ post: newPost });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error });
		}
	}
);

// fetch a list of posts: shivam
router.get('/', checkIfAuthenticated ,async (req, res) => {
	try {
		let { limit = 10, page = 1 } = req.query;
		page--;

		const last3days = subDays(new Date(), 3);

		const posts = await Post.find({
			createdAt: { $gte: last3days },
			isDeleted: false,
		})
			.populate('tags', ['_id', 'name'])
			.populate('author', ['_id', 'username', 'title', 'profileImg'])
			.sort({ createdAt: -1 })
			.skip(parseInt(limit) * parseInt(page))
			.limit(parseInt(limit));

		const count = await Post.countDocuments({
			createdAt: { $gte: last3days },
			isDeleted: false,
		});

		res.status(200).json({
			posts,
			count,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
});

// search in a list of posts: shivam
router.get('/search', async (req, res) => {
	try {
		let { limit = 10, search = '', page = 1, tags = '' } = req.query;
		page--;
		search = search.toLowerCase();

		if (tags.length > 0) {
			tags = tags.split(',').map((i) => i.toLowerCase());
		}

		const posts = await Post.find({
			isDeleted: false,
		})
			.populate('tags', ['_id', 'name'])
			.populate('author', ['_id', 'username', 'title', 'profileImg'])
			.sort({ createdAt: -1 });

		const filteredPosts = posts.filter((p) => {
			const content = p.content;
			const tagsList = p.tags;

			if (tags.length > 0) {
				return tagsList?.some((i) => {
					return tags.includes(i.name.toLowerCase());
				});
			} else {
				return (
					content.toLowerCase().includes(search) ||
					tagsList?.some((i) => {
						return i.name.toLowerCase().includes(search);
					})
				);
			}
		});

		res.status(200).json({
			posts: filteredPosts.splice(
				parseInt(limit) * parseInt(page),
				parseInt(limit)
			),
			count: posts.length,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
});

// fetch a single post: riyanshu
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id))
		return res.status(401).json({ error: 'Invalid request!' });

	try {
		const post = await Post.findById(id)
			.populate('tags', ['_id', 'name'])
			.populate('author', ['_id', 'username', 'title', 'profileImg'])
			.populate('comments');

		post.comments = await Promise.all(
			post.comments.map(async (c, idx) => {
				const comment = await Comment.findById(c._id).populate('author', [
					'_id',
					'profileImg',
				]);
				return comment;
			})
		);

		res.status(200).json({ post });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
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
		res.status(200).json({ message: 'Post Deleted successfully!' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err });
	}
});

// update Post
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const userId = req.body.userId;

	if (!isValidObjectId(id) || !isValidObjectId(userId))
		return res.status(401).json({ error: 'Invalid request!' });

	const post = await Post.findById(req.params.id);

	if (!post) return res.status(404).json({ error: 'Post not found!' });

	let { author, content, tags, visibility, image } = req.body;
	const allTags = await Tag.find();

	tags = tags.map((i) => {
		return allTags.find((item) => item.name.toLowerCase() === i.toLowerCase())
			._id;
	});

	try {
		const post = await Post.findById(req.params.id);
		if (post.author.equals(req.body.userId)) {
			const updatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				{
					$set: { author, content, tags, visibility, thumbnail: image },
					updated: { at: Date.now(), by: userId },
				},
				{ new: true }
			);
			res.status(200).json({ post: updatedPost });
		} else {
			res.status(401).json('You can update only your post!');
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
});

// upvote/ downvote a post
router.put('/votes/:postId', async (req, res) => {
	try {
		const { postId } = req.params;
		const { userId } = req.body;

		if (!isValidObjectId(postId) || !isValidObjectId(userId))
			return res.status(401).json({ error: 'Invalid request!' });

		const post = await Post.findById(postId);
		const userIdx = post.upvotes.indexOf(userId);

		if (userIdx !== -1) {
			post.upvotes.splice(userIdx, 1);
		} else {
			post.upvotes.push(userId);
		}
		post.save();

		res.status(200).json({ post });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error?.message });
	}
});

module.exports = router;
