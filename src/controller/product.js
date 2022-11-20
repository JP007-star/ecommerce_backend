const shortid = require('shortid');
const { default: slugify } = require('slugify');
const Category = require('../models/category');
const Product = require('../models/product')
exports.addProduct = (req, res, next) => {
    // console.log(req.files[0].filename);
    const { name, price, description, category, quantity, createdBy } = req.body;

    let productPicture = [];

    if (req.files.length >= 0) {
        productPicture = req.files.map(_file => {
            return { image: _file.filename }
        })
        // console.log(productPicture);
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPicture: productPicture,
        quantity,
        category,
        createdBy: req.user._id
    });
    // console.log(productPicture);

    product.save((error, product) => {
        if (error) { res.status(400).json({ error: error }) }

        if (product) res.status(200).json({ product: product })
    })



}

exports.getProduct = (req, res) => {
    Product.find({})
        .exec((error, product) => {
            if (error) return res.status(400).json({ error: error });
            if (product) {

                return res.status(200).json({ product: product })
            }
        })
}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) return res.status(400).json({ error: error });
            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {
                        if (error) return res.status(400).json({ error: error });
                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k: products.filter(product => product.price <= 5000),
                                    under10k: products.filter(product => product.price > 5000 && product.price < 10000),
                                    under15k: products.filter(product => product.price > 10000 && product.price < 15000),
                                    under20k: products.filter(product => product.price > 15000 && product.price < 20000),
                                    under30k: products.filter(product => product.price > 20000 && product.price < 30000),
                                    above30k: products.filter(product => product.price > 30000),
                                }
                            })
                        }
                    })
            }
        })


}