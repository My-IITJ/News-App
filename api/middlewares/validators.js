const { check, validationResult } = require('express-validator');

// chain of validators
exports.newPostValidator = [
	check('author').trim().not().isEmpty().withMessage('Author is missing!'),
	check('content').trim().not().isEmpty().withMessage('Content is missing!'),
	check('visibility').trim().not().isEmpty().withMessage('Invalid visibility!'),
];

// add any validator chain

// middleware to check if there are any errors
// from a validator chain
exports.validate = (req, res, next) => {
	const errors = validationResult(req).array();
	if (errors.length) return res.status(500).json({ error: errors });
	next();
};
