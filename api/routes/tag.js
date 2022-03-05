const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const Tag = require('../db/models/Tag');

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
		res.status(500).json({ error });
	}
});

module.exports = router;
