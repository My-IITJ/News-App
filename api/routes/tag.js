const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const Tag = require('../db/models/Tag');
const {
	validate,
	newTagValidator,
	updateTagValidator,
} = require('../middlewares/validators');

// get a list of tags
router.get('/', async (req, res) => {
	try {
		const tags = await Tag.find();

		res.status(200).json({ tags, count: tags.length });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
});

// get a single tag
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) return res.status(401).json('Invalid Tag id');

		const tag = await Tag.findById(id);

		if (!tag || tag.isDeleted) return res.status(404).json('Tag not found');

		res.status(200).json({ tag });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

// create a new tag
router.post('/new', newTagValidator, validate, async (req, res) => {
	try {
		const { name, desc, type } = req.body;

		const newTag = await Tag({ name, desc, type });
		await newTag.save();

		res.status(200).json({ tag: newTag });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

// update a  tag
router.put('/:id', updateTagValidator, validate, async (req, res) => {
	try {
		const { name, desc, type } = req.body;
		const { id } = req.params;

		if (!isValidObjectId(id)) return res.status(401).json('Invalid Tag id');

		const updatedTag = await Tag.findByIdAndUpdate(
			id,
			{ name, desc, type },
			{ new: true }
		);

		res.status(200).json({ tag: updatedTag });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

module.exports = router;
