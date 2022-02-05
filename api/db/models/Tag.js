const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    tagId : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
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

})

module.exports = mongoose.model('tag', tagSchema)