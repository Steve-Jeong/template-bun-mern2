const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title : {
    type: String,
    required: [true, "Post require a title"]
  },
  body : {
    type: String,
    required: [true, "Post require a body"]
  }
})

module.exports = mongoose.model('Post', postSchema)