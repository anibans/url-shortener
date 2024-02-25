const nanoid = require('nanoid')

const urlModel = require('../models/UrlModel.js')
const {AuthModel} = require('../models/AuthModel.js')

const getUrlList = async (req,res)=>{
    const {userId} = req.body
    const urls = await urlModel.find({userId: userId})
    if(urls.length>0){
        res.status(200).json(urls)
    }else{
        return res.status(404).json({message: 'No urls for this user'})
    }
}

const createShortLink = async (req,res)=>{
    const {originalURL, userId} = req.body

    const user = await AuthModel.findById(userId)
    if(user.urlsCreated<10){
        const shortCode = nanoid.nanoid(6)

        const newShortLink = new urlModel({
            urlToShorten: originalURL,
            shortenedCode: shortCode,
            userId: userId
        })
        await newShortLink.save()
        
        
        user.urlsCreated+=1
        
        const userUpdate = await AuthModel.findByIdAndUpdate(userId, user, {new:true})
        
        if(!userUpdate){
            res.status(400).json({error: 'U - Operation unsuccessful'})
        }else{
            res.status(200).json({shortLink: `http://localhost:9876/url/visit/${shortCode}`})
        }
    }else{
        res.status(403).json({error: 'URL shortening limit reached, please contact admin for increasing the limit'})
    }
} 

const visitURL = async (req,res)=>{
    const {shortName} = req.params

    const url = await urlModel.find({shortenedCode: shortName})
    if(url.length===1){
        res.status(200).redirect(`//${url[0].urlToShorten}`)
    }else{
        return res.status(404).json({message: 'shortname not found'})
    }
}

const deleteURL = async (req,res)=>{
    const {id} = req.params

    const url = await urlModel.find({_id:id})
    if(url.length===1){
        const userId = url[0].userId
        const deletedUrl = await urlModel.deleteOne({_id:id})
        if(deletedUrl){
            const user = await AuthModel.findById(userId)
            if(user){
                user.urlsCreated-=1
                await AuthModel.findByIdAndUpdate(userId,user,{new:true})
                res.status(200).json({message:'URL deleted successfully',data:deletedUrl})
            }else{
                res.status(403).json({error:'something went wrong in the user model'})
            }
        }else{
            res.status(403).json({error:'Error in deleting URL'})
        }
    }else{
        return res.status(404).json({message: 'URL not found'})
    }
}

module.exports = {getUrlList,createShortLink,visitURL,deleteURL}