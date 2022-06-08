const express=require('express')
const {signup, signin, requireSigin}=require('../controller/auth')

const {  isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../validators/auth')
const router=express.Router()



router.post('/signin', validateSignInRequest,isRequestValidated,signin)

router.post('/signup',validateSignUpRequest,isRequestValidated,signup)

router.post('/profile',requireSigin,(req,res)=>{
    res.status(200).json({user:"profile"})
})

module.exports =router