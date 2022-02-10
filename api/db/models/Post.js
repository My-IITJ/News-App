const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		content: {
			type: String,
			required: true,
		},
		tags: [
			{
				tag: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Tag',
				},
			},
		],
		thumbnail: {
			type: String,
		},
		upvotes: {
			type: Number,
			default: 0,
		},
		comments: [
			{
				comment: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Comment',
				},
			},
		],
		visibility: {
			type: String,
			required: true,
		},
		isdeleted: {
			type: Boolean,
		},
		deleted: {
			at: {
				type: Date,
			},
			by: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
