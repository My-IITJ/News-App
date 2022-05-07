const passport = require('passport');
const router = require('express').Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login/failed',
	}),
	(req, res) => {
		console.log('success');
		const userData = JSON.stringify(req.user);
		res.redirect(`myiitj://login?data=${userData}`);
	}
);

router.get('/login/failed', (req, res) => {
	console.log('failed');
	res.status(401).json('login failed');
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.status(200).json('logged out');
});

module.exports = router;
