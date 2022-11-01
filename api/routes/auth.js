const router = require('express').Router();
const User = require('../db/models/User');

router.post('/user-details', async (req, res) => {
	try {
		const { email, photoUrl, displayName, uid } = req.body;

		const user = await User.findOne({ email });

		if (user) {
			return res
				.status(200)
				.json({ _id: user._id, profileImg: user.profileImg });
		} else {
			const newUser = new User({
				userId: uid,
				username: displayName || 'John Doe',
				email,
				profileImg: photoUrl,
			});

			await newUser.save();
			return res
				.status(200)
				.json({ _id: newUser._id, profileImg: user.profileImg });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
