const express=require('express');
const { addCategory, getCategory } = require('../controller/category');
const { requireSigin, adminMiddleware } = require('../middleware');


const routes = express.Router()

routes.post('/category/create',requireSigin,adminMiddleware,addCategory)
routes.get('/category/getCategory',getCategory)

module.exports =routes;