const express = require('express')
const mongoose = require('mongoose')
const Login = require('../models/loginModel')
const User = require('../models/dataModel')

const router = express.Router()


router.get('/',async(req,res,next)=>{
    try {
        const logins = await Login.find();
        res.status(200).json(logins);
    } catch (err) {
        next(err);
    }
})
router.post('/',async(req,res,next)=>{
    try {
        const new_id = new mongoose.Types.ObjectId()
        const new_login = new Login({
            _id: new_id,
            email: (req.query.email),
            name: (req.query.name),
            password: (req.query.password)
        })
        const new_user = new User({
            _id: new_id,
        })
        await new_login.save()
        await new_user.save().catch()
        console.log('Data Entered')
    } catch (err) {
        next(err);
    }
})
router.get('/find',async(req,res,next)=>{
    try {
        const result = await Login.findOne({email: req.query.email})
        res.status(200).json(result)
    } catch (err) {
        next(err);
    }
})

module.exports = router

