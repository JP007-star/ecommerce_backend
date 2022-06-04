const User=require('../models/user')

exports.signup = (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec((err,user)=>{
        if(user) return res.status(400).json({
            message: 'User already exists'
        })
    })

    const {firstName,lastName,email,password}= req.body

    const _user=new User({
        firstName,
        lastName,
        email,
        password,
        username:Math.random().toString()
    })

    _user.save((err,data)=>{
        if(err) return res.status(400).json({
            message: err.message
        })
        if(data) return res.status(201)
        .json({
            user:data
        })
    })

}