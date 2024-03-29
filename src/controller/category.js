const { default: slugify } = require('slugify');
const Category = require('../models/category')
const shortid = require('shortid')



function createCategories(categories, parentId = null) {
    const categoryList = []
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined || cat.parentId == '')
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        })
    }
    return categoryList;
}
exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    }
    if (req.file) {
        categoryObj.categoryImage = process.env.API + req.file.filename;
    }



    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }


    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error: error });
        if (category)
            return res.status(201).json({ category: category })
    })

}


exports.getCategory = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error });
        console.log(categories);
        if (categories) {
            const categoryList = createCategories(categories);
            res.status(200).json({ categories: categoryList });
        }
    });
}

exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body
    const updateCategories = []
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }
            if (parentId[i] == "") {
                category.parentId = parentId[i]
            }
            const updateCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true })
            updateCategories.push(updateCategory)
        }
        return res.status(201).json({ updateCategories: updateCategories })
    }
    else {
        const category = {
            name,
            type
        }
        if (parentId == "") {
            category.parentId = parentId
        }
        const updateCategory = await Category.findOneAndUpdate({ _id }, category, { new: true })
        return res.status(201).json({ updateCategory })

    }

}

exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload
    const deletedCategories = []
    for (let i = 0; i < ids.length; i++) {
        const category = await Category.findOneAndDelete({ _id: ids[i]._id })
        deletedCategories.push(category)
    }
    if (deletedCategories.length == ids.length) {
        res.status(201).json({message:'category deleted successfully'})
    }
    else {
        res.status(400).json({message:'some things went wrong'})
    }
}