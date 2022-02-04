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
        tags:{
            type: Array,
            required: true,
        },
        thumbnail:{
            type: String,
            required: false,
        },
        upvotes:{
            type: Number,
            required: true,
        },
        comments:{
            type: Array,
            required: true,
        },
        visibility:{
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema)