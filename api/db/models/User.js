const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		Username: {
			type: String,
			required: true,
		},
		Bio: {
			type: String,
		},
		Title: {
			type: String,
		},
		subscribedTags: [
			{
				tag: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Tag',
				},
			},
		],
		profileImg: {
			type: String,
		},
		resume: {
			tyle: String,
		},
		posts: [
			{
				post: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Post',
				},
			},
		],
		savedPosts: [
			{
				post: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Post',
				},
			},
		],
		// createdAt: {
		// 	type: Date,
		// 	default: Date.now,
		// },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
