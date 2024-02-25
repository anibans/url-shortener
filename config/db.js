const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL


const connectToDB = async dbName=>{
    const url = DATABASE_URL
    try{
        await mongoose.connect(url)
        console.log('Connected to database successfully')
    }catch(err){
        console.error('Error connecting to db')
    }
}

module.exports = {connectToDB}