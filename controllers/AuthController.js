const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {AuthModel} = require('../models/AuthModel.js')

const signup = async (req,res)=>{
    const {username,password,confirmPassword} = req.body
    const user = await AuthModel.findOne({username})
    if(user){
        return res.status(400).json({error: 'User already exists'})
    }
    if(password !== confirmPassword){
        return res.status(400).json({error: 'Passwords mismatch'})
    }
    const hashedPassword = await bcrypt.hash(password,12)
    const newUser = new AuthModel({
        username: username,
        password: hashedPassword,
        urlsCreated: 0
    })
    await newUser.save()
    res.status(201).json({message: 'User created successfully'})
}

const signin = async (req,res)=>{
    const {username,password} = req.body
    const user = await AuthModel.findOne({username})
    if(user){
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(isPasswordCorrect){
            const token = jwt.sign({ username: user.username, userId: user._id }, 'secret', { expiresIn: '1h' })
            res.status(200).json({token, userId: user._id, username: user.username})
        }else{
            return res.status(401).json({message: 'Incorrect password'})
        }
    }else{
        return res.status(404).json({message: 'User does not exist'})
    }
}

module.exports = {signup,signin}