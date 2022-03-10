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
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		upvotes: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			],
			default: [],
		},
		isDeleted: {
			type: Boolean,
			default: false,
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
