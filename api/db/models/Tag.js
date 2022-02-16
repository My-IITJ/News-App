const mongoose = require('mongoose');

const tagSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		desc: {
			type: String,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			trim: true,
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

module.exports = mongoose.model('Tag', tagSchema);
