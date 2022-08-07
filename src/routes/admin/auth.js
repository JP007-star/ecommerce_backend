const express=require('express')
const {signup, signin,signout}=require('../../controller/admin/auth')
const { validateSignInRequest, isRequestValidated, validateSignUpRequest } = require('../../validators/auth')
const {requireSigin} = require('../../middleware/index')
const router=express.Router()



router.post('/admin/signin',validateSignInRequest,isRequestValidated, signin)
router.post('/admin/signup',validateSignUpRequest,isRequestValidated,signup)
router.post('/admin/signout',requireSigin,signout)



module.exports =router