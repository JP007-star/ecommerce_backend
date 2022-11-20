const express=require('express')
const { initialData } = require('../../controller/admin/initialData')
const { requireSigin, adminMiddleware } = require('../../middleware')
const router=express.Router()



router.post('/initialdata',requireSigin,adminMiddleware, initialData )




module.exports =router