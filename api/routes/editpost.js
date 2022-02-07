const router = require('express').Router();
const Post = require('../db/models/Post');
const {isValidObjectId} = require('mongoose')

// fetch a list of posts
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
// fetch a single post
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
router.update('/:id', async(req, res) => {
	const id = req.params.id
	const userId = req.body.userId

	if(!isValidObjectId(id))
	return res.status(401).json({error: "Invalid request!"})

	const post = await Post.findById(req.params.id)

	if(!post)
	return res.status(404).json({error: "Post not found!"})

    if(file){
        const{secure_url: url} = await cloudinary.uploader.upload(file.path);
        post.thumbnail = {url};
    }

    post.author = author;
    post.content = content;
    post.thumbnail = thumbnail;
    post.tags = tags;


    post.isupdated = true
	post.updated = {at: Date.now(), by:userId}

    try{
        await post.save()
        res.json({message: "Post Updated successfully!"})
    }catch(err){
        res.status(500).json(err)
      }

  })

  
    