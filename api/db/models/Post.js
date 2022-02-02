const mongoose = require("mongoose")

//module.exports = mongoose.model('Author', UserSchema) to be added in User.js

// const Author = require('./User').schema

const PostSchema = new mongoose.Schema(
    {
        postId:{
            //
            unique: true,
            required: true,
        },
        author:{
            type: String,
            required: true,
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
        usertype:{
            type: String,
            required: true,
        },
        // createdAt:{

        // },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)