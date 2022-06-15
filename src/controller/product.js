const shortid=require('shortid');
const { default: slugify } = require('slugify');
const Product = require('../models/product')
exports.addProduct=(req, res, next) => {
    console.log(req.files[0].filename);
    const { name,price ,description,category,quantity,createdBy} =req.body;

    let productPicture=[];

    if (req.files.length >= 0) {
        productPicture=req.files.map(_file => {
              return {image : _file.filename}
        })
        console.log(productPicture);
    }
    const product =new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPicture:productPicture,
        quantity,
        category,
        createdBy:req.user._id 
    });
    console.log(productPicture);

    product.save((error,product)=>{
        if (error) {res.status(400).json({error: error})}
     
        if (product)  res.status(200).json({product: product})
    })
   

    
}

exports.getProduct= (req, res)=>{
    Product.find({})
    .exec((error,product)=>{
        if(error) return res.status(400).json({error: error});
        if(product){
            
            return res.status(200).json({product: product})
        }
    })
}