const authController = require('../controllers/authControllers')

const express = require('express')
const router = express.Router()

router.route('/').get(authController.listAllUsers)
router.route('/signup').post(authController.signUp)
router.route('/login').post(authController.login)
router.route('/delete').delete(authController.deleteUser)

module.exports = router