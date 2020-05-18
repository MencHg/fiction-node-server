const mongoose = require('mongoose');
const verifySchema = new mongoose.Schema({
  email: { type: String, required: true},
  time: { type: Date, default: Date.now()},
  verify: { type: String, required: true }
})
module.exports = mongoose.model('verify', verifySchema)