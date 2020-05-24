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
    bookinfo:{
        type:Object,
        required:true
    },
    lately:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('history',historySchema)