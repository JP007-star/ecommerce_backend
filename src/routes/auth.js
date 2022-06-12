const express=require('express')
const {signup, signin}=require('../controller/auth')
const {requireSigin}= require('../middleware/index')

const {  isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../validators/auth')
const router=express.Router()



router.post('/signin', validateSignInRequest,isRequestValidated,signin)

router.post('/signup',validateSignUpRequest,isRequestValidated,signup)

router.post('/profile',requireSigin,(req,res)=>{
    res.status(200).json({user:"profile"})
})

module.exports =router