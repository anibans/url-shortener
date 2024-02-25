const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    urlsCreated:{
        type: Number,
        required: [true, 'Number of urls created is required']
    },
    limitForgiven:{
        type: Boolean,
        default: false
    }
})

const AuthModel = mongoose.model('auth',authSchema)

module.exports = {AuthModel}