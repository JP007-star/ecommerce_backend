const express=require('express');
const { addCategory, getCategory } = require('../controller/category');
const { requireSigin, adminMiddleware } = require('../middleware');
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

const routes = express.Router()

routes.post('/category/create',requireSigin,adminMiddleware,upload.single('categoryImage'),addCategory)
routes.get('/category/getCategory',getCategory)

module.exports =routes;