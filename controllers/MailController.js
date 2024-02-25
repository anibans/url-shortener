const {transporter: mailTransporter, mailOptions} = require('../middlewares/NodeMailer.js')

const sendMail = async (req,res)=>{
    const {fromMailAddress} = req.body
    mailOptions.from = fromMailAddress
    
    mailTransporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            res.status(400).json({message: 'Error in sending email', error: err})
        }else{
            res.status(200).json({message: 'Email sent', email_info: info.response})
        }
    })

}

module.exports = sendMail