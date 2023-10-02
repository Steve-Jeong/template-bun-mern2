const postController = require('../controllers/postControllers')

const express = require('express')
const router = express.Router()

router.route('/').get(postController.getAllPost).post(postController.createPost)
router.route('/:id').get(postController.getPost).patch(postController.updatePost).delete(postController.deletePost)

module.exports = router