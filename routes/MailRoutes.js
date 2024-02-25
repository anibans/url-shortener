const express = require('express')
const sendMail = require('../controllers/MailController')
const MailRouter = express.Router()



MailRouter.post('/',sendMail)

module.exports = MailRouter