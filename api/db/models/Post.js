const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        author:{
            type: mongoose.Schema.types.ObjectId,
            required: true,
            ref: "User",
        },
        content:{
            type: String,
            required: true,
        },
        tags:[
            {
                tag: {
                    type: mongoose.Schema.types.ObjectId,
                    ref: "Tag",
                },
            },
        ],
        thumbnail:{
            type: String,
            required: false,
        },
        upvotes:{
            type: Number,
            required: true,
        },
        comments:[
            {
                comment: {
                    type: mongoose.Schema.types.ObjectId,
                    ref: "Comment",
                },
            },
        ],
        visibility:{
            type: String,
            required: true,
        },
        isdeleted:{
            type: Boolean,
            required: true,
        },
        deleted:{
            at: {
                type: Date,
            },
            by: {
                type: mongoose.Schema.types.ObjectId,
                ref: "User",
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema)
