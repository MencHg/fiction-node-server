const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId
const discussSchema = new mongoose.Schema({
  book:{
    type:ObjectId,
    ref:'books'
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
module.exports = mongoose.model('discuss',discussSchema)