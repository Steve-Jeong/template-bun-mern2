const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password required']
  }
})

module.exports = mongoose.model('Auth', authSchema)