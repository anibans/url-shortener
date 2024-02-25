const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    urlToShorten : {
        type: String,
        required: [true, 'URL is required']
    },
    shortenedCode : {
        type: String,
        required: [true, 'Shortened code is required']
    },
    userId : {
        type: String,
        required : [true, 'User ID is required']
    }
})

const urlModel = mongoose.model('urls',urlSchema)

module.exports = urlModel