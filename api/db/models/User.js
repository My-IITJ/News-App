const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
		},
		title: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		profile: String,
		subscribedTags: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
		profileImg: {
			type: String,
		},
		resume: {
			type: String,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
		savedPosts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
