const express=require('express')
const { createPage, getPage } = require('../../controller/admin/page')
const { upload, requireSigin, adminMiddleware } = require('../../middleware')

const router=express.Router()



router.post('/page/create',requireSigin,adminMiddleware, upload.fields([
    {name:'banners'},
    {name:'products'}
]),createPage )

router.get(`/page/:category/:type`,getPage)




module.exports =router