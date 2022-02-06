const mongoose = require('mongoose')

const tagSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        desc : {
            type : String,
            trim : true
        },
        type : {
            type : String,
            required : true,
            trim : true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Tag', tagSchema)