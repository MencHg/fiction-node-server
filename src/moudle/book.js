const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId
const bookSchema = new mongoose.Schema({
  auth:{
    type:ObjectId,
    ref:'users'
  },
  title:{
    type:String,
    required: true,
  },
  book:{
    type:String,
    required: true,
  },
  creationTime:{
    type:Date,
    default:new Date()
  },
  star:{
    type:Number,
    default:0
  }
})
module.exports = mongoose.model('books',bookSchema)