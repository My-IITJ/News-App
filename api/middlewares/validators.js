const { check, validationResult } = require('express-validator');

// chain of validators
exports.newPostValidator = [
	check('author').trim().not().isEmpty().withMessage('Author is missing!'),
	check('content').trim().not().isEmpty().withMessage('Content is missing!'),
	check('visibility').trim().not().isEmpty().withMessage('Invalid visibility!'),
];

exports.editUserValidator = [
	check('username')
		.trim()
		.optional()
		.not()
		.isEmpty()
		.withMessage('User name is missing!'),
	check('bio').trim().not().optional().isEmpty().withMessage('Bio is missing!'),
	check('title')
		.trim()
		.not()
		.optional()
		.isEmpty()
		.withMessage('Title is missing!'),
];

exports.newTagValidator = [
	check('name').trim().not().isEmpty().withMessage('Tag name is missing!'),
	check('desc').trim().not().isEmpty().withMessage('Description is missing!'),
	check('type').trim().not().isEmpty().withMessage('Tag type is missing!'),
];

exports.updateTagValidator = [
	check('name')
		.trim()
		.optional()
		.not()
		.isEmpty()
		.withMessage('Tag name is missing!'),
	check('desc')
		.trim()
		.optional()
		.not()
		.isEmpty()
		.withMessage('Description is missing!'),
	check('type')
		.trim()
		.optional()
		.not()
		.isEmpty()
		.withMessage('Tag type is missing!'),
];

// middleware to check if there are any errors
// from a validator chain
exports.validate = (req, res, next) => {
	const errors = validationResult(req).array();
	if (errors.length) return res.status(500).json({ error: errors });
	next();
};
