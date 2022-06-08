const express=require('express')
const {signup, signin, requireSigin}=require('../../controller/admin/auth')
const { validateSignInRequest, isRequestValidated, validateSignUpRequest } = require('../../validators/auth')
const router=express.Router()



router.post('/admin/signin',validateSignInRequest,isRequestValidated, signin)

router.post('/admin/signup',validateSignUpRequest,isRequestValidated,signup)



module.exports =router