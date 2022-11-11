const router = require('express').Router();
const User = require('../db/models/User');
const admin = require("firebase-admin")

router.post('/user-details', async (req, res) => {
	try {
		const { email, photoUrl, displayName, uid, role } = req.body;
		// set custom user claims
		await admin.auth().setCustomUserClaims(uid, { role });
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
				.json({ _id: newUser._id, profileImg: newUser.profileImg });
		}
	} catch (error) {
		console.error(error)
		res.status(500).json(error);
	}
});

module.exports = router;
