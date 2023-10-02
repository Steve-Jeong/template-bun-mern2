const Auth = require('../models/authModel')

exports.signUp = async (req, res) => {
  try {
    const user = await Auth.create(req.body)
    res.status(200).json({
      status: 'success',
      user: {user}
    })
  } catch (error) {
    console.log('signup error : ', error)
    message = ''
    if(error.code == 11000) {
      message = 'username already exists'
    }
    if(!error.code && error.errors.username) {
      message = 'username is required'
    }
    if(!error.code && error.errors.password) {
      message = 'password is required'
    }
    res.status(400).json({
      status: 'fail',
      message: message
    })
  }
}

exports.listAllUsers = async (req, res) => {
  try {
    const users = await Auth.find()
    res.status(200).json({
      status: 'success',
      user: {users}
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'users listup failed'
    })
  }
}

exports.login = async (req, res) => {
  try {
    const {username, password} = req.body
    // console.log('username: ', username, 'password : ', password)
    const user = await Auth.findOne({username})
    if(!user) {
      res.status(400).json({
        status: 'fail',
        message: 'no user exist'
      })
    }
    if(password != user.password) {
      res.status(400).json({
        status: 'fail',
        message: 'password incorrect'
      })
    } else {
      req.session.user = user
      req.session.theme = {
        theme : 'dark',
        font : 'd2coding'
      }
      res.status(200).json({
        status: 'success',
        message: 'successfully logged in',
        user: {user}
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'user login error'
    })
  }
}

exports.deleteUser = async(req, res) => {
  try {
    const {username, password} = req.body
    // console.log('username: ', username, 'password :  ', password)
    const user = await Auth.findOne({username})
    // console.log('user._id 1: ', user._id.toString())

    if(!user) {
      res.status(400).json({
        status: 'fail',
        message: 'no user exist'
      })
    }
    if(password != user.password) {
      res.status(400).json({
        status: 'fail',
        message: 'password incorrect'
      })
    } else {
      req.session.user = ''
      // console.log('user._id 2: ', user._id.toString())
      const deletedUser = await Auth.findByIdAndDelete(user._id.toString())
      // console.log('delete a user : ', deletedUser)
      res.status(200).json({
        status: 'success',
        message: 'successfully deleted the user',
        user : {deletedUser}
      })
    }
  } catch (error) {
    console.log('delete user error : ', error)
    res.status(400).json({
      status: 'fail',
      message: 'user login error'
    })
  }
}