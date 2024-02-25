const express = require('express')
const authorizationHeader = require('../middlewares/Auth.js')
const { 
    getUrlList, 
    createShortLink, 
    visitURL, 
    deleteURL } 
    = require('../controllers/UrlController')


const UrlRouter = express.Router()

UrlRouter.get('/list',authorizationHeader,getUrlList)

UrlRouter.post('/shorten',authorizationHeader,createShortLink)

UrlRouter.get('/visit/:shortName',visitURL)

UrlRouter.delete('/delete/:id',authorizationHeader,deleteURL)


module.exports = UrlRouter