const express = require('express')
const { signup, signin } = require('../controllers/AuthController')
const AuthRouter = express.Router()

AuthRouter.post('/signup',signup)

AuthRouter.post('/signin',signin)

module.exports = AuthRouter