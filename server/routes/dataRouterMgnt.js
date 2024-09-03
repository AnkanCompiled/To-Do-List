const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/dataModel')

const router = express.Router()

router.get('/',async(req,res,next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch{
        next(err)
    }
})

router.get('/list',async(req,res,next)=>{
    try{
        const document = await User.findById(new mongoose.Types.ObjectId(req.query.id))
        res.status(200).json(document)
        
        
    } catch(err){
        next(err)
    }
})
router.post('/list',async(req,res,next)=>{
    try{
        const document = await User.findById(new mongoose.Types.ObjectId(req.query.id))
        console.log('List Added: ',req.body)
        async function listData(){
            let list = {}
            for (const [key, value] of Object.entries(req.body)){
                if (value !== '') {
                    list[key] = value;
                }
            }
            return list
        }
        document.entry.push(await listData())
        await document.save()

        res.status(200).json(document)
        
    } catch(err){
        next(err)
    }
})

router.post('/update',async(req,res,next)=>{
    try{
        async function checkUpdatedList(){
            let list = {}
            for (const [key, value] of Object.entries(req.body)){
                if (value !== '') {
                    list[`entry.$.${key}`] = value
                }
            }
            return list
        }
        const updatedList = await checkUpdatedList()
        const document = await User.updateOne(
            { _id: req.query.id, 'entry._id': req.query.listid },
            {
                $set: updatedList
            }
        )
        res.status(200).json(document)
    } catch{
        next(err)
    }
})


router.get('/delete',async(req,res,next)=>{
    try{
        const document = await User.updateOne(
            {_id: req.query.id},
            {$pull: {entry: {_id: req.query.listid}}}
        )
        res.status(200).json(document)
    } catch{
        next(err)
    }
})

module.exports = router