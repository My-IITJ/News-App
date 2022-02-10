const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		parent: {
			parentDetails: mongoose.Schema.Types.ObjectId,
			parentType: String, // as parent can be a post or another comment
		},
		content: {
			type: String,
			required: true,
		},
		replies: [
			{
				reply: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Comment',
				},
			},
		],
		upvotes: {
			type: Number,
			default: 0,
		},
		isDeleted: {
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
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Comment', commentSchema);
