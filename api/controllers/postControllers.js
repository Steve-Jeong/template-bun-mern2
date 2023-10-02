const Post = require('../models/postModel')

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json({
      status: 'success',
      data: {posts}
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'get all posts failed'
    })
  }
}

exports.createPost = async (req, res) => {
  try {
    console.log(req.body)
    const post = await Post.create(req.body)
    res.status(200).json({
      status: 'success',
      data: {post}
    })
  } catch (error) {
    console.log('create post error : ', error)
    res.status(400).json({
      status: 'fail',
      message: 'creating a post failed'
    })
  }
}

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // console.log('get a post : ', post)
    res.status(200).json({
      status: 'success',
      data: {post}
    })
  } catch (error) {
    // console.log('get post error : ', error)
    res.status(400).json({
      status: 'fail',
      message: 'get a post failed'
    })
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new:true,
      runValidators: true
    })
    console.log('update post : ', post)
    res.status(200).json({
      status:'success',
      data: {
        post
      }
    })
  } catch(e) {
    console.log(e)
    res.status(400).json({
      status:'fail',
      message: 'updating a post failed'
    })
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    console.log('delete a post : ', post)
    res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    // console.log('delete post error : ', error)
    res.status(400).json({
      status: 'fail',
      message: 'delete a post failed'
    })
  }
}