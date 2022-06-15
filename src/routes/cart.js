const express=require('express');
const { addCart, getCart } = require('../controller/cart');
const { requireSigin, userMiddleware } = require('../middleware');


const routes = express.Router()

routes.post('/user/cart/addtocart',requireSigin,userMiddleware,addCart)
// routes.get('/cart/getcart',getCart)

module.exports =routes;