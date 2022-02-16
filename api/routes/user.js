const router = require('express').Router();
const User = require('../db/models/User');
const upload = require('../middlewares/multer');

// create a new user : Neil
router.post('/new', async (req, res) => {
	try {
		const { userId, username } = req.body;

		if (!userId) return res.status(404).json('User id is required');
		if (!username) return res.status(404).json('Username is required');

		const user = {
			userId,
			username,
		};

		const newUser = new User(user);

		await newUser.save();

		res.status(200).json({ user: newUser });
	} catch (error) {
		res.status(500).json(error);
	}
});

// fetch a single user : Sakshi
router.get("/:id", async (req, res) => {
	try {
	  const user = await User.findById(req.params.id);
	  res.status(200).json(user);
	}catch (err) {
	  res.status(500).json(err);
	}
});

// update user settings

module.exports = router;
