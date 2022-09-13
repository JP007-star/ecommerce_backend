const express=require('express');
const { addProduct, getProduct } = require('../controller/product');
const { requireSigin, adminMiddleware } = require('../middleware');
const routes = express.Router()
const  multer=require('multer');
const shortid= require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),"uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const  upload =multer({storage}) 

routes.post('/product/create',requireSigin,adminMiddleware,upload.array('productPicture'),addProduct) //upload.single('productPicture')
routes.get('/product/getproduct',getProduct)

module.exports =routes; 