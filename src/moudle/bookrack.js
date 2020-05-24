const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId
const historySchema = new mongoose.Schema({
    id:{
        type:ObjectId,
        ref:'users',
        required:true
    },
    creationTime:{
        type:Date,
        default:new Date()
    },
    bookid:{
        type:String,
        required:true
    },
    cover_image:{
        type:String,
        required:true
    },
    article_title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    article_intro:{
        type:String,
        required:true
    },
    article_status:{
        type:String,
        required:true
    },
    lately:{
        type:{
            id:String,
            title:String
        },
        required:true
    }
})
module.exports = mongoose.model('history',historySchema)