const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User",
    },
    content :{
        type : String,
        required : true,
    },
    replies :[
        {
            reply :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "Comment",
            }
        }
    ],
    upvotes :{
        type : Number,
    },
    isDeleted : {
        type : Boolean,
    },
    deleted : {
        at : {
            type : Date,
        },
        by : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    }
},{
    timestamps : true,
});

module.exports = mongoose.model('Comment', commentSchema)