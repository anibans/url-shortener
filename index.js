const express = require('express')
const bodyParser = require('body-parser')

/* Routes start */
const AuthRouter = require('./routes/AuthRoutes')
const UrlRouter = require('./routes/UrlRoutes')
const MailRouter = require('./routes/MailRoutes.js')
/* Routes end */

const {connectToDB} = require('./config/db.js')


const app = express()

app.use(bodyParser.json())

const databaseName = 'url-shortener'
connectToDB(databaseName)

app.use('/auth',AuthRouter)
app.use('/url',UrlRouter)
app.use('/mail',MailRouter)

app.get('/',(req,res)=>{
    res.send('Server is running')
})

app.listen(9876,()=>{
    console.log('server started on port 9876')
})