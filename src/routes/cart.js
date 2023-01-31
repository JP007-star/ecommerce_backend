const express=require('express');
const {  getCartItems, removeCartItems, addCart } = require('../controller/cart');
const { requireSigin, userMiddleware, adminMiddleware } = require('../middleware');


const routes = express.Router()

routes.post('/user/cart/addtocart',requireSigin,userMiddleware,addCart)
routes.post("/user/getCartItems", requireSigin, userMiddleware, getCartItems);
routes.post( "/user/cart/removeItem",requireSigin,userMiddleware,removeCartItems);

module.exports =routes;