const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
const gmailAppPassword = process.env.GMAIL_APP_PASS

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'aniket.b1994@gmail.com',
        pass: gmailAppPassword
    },
})

const mailOptions = {
    from: "",
    to: "aniket.b1994@gmail.com",
    subject: "Limit increase request",
    text: "Dear developer, I need to shorten more URL, kindly increase my limit."
}

module.exports = {transporter,mailOptions}