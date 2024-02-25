const jwt = require('jsonwebtoken')

const authorizationHeader = (req,res,next)=>{
    const authToken = req.header('Authorization')
    if(!authToken){
        return res.status(401).json({message: 'Unauthorized request'})
    }
    jwt.verify(authToken,'secret',(err,user)=>{
        if(err){
            return res.status(403).json({message: 'Forbidden'})
        }
        req.user = user
        next()
    })
}

module.exports = authorizationHeader