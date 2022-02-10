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
			type: String,
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
