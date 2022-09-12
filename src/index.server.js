const express =require('express')
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const authRoutes=require('./routes/auth')
const adminRoutes=require('./routes/admin/auth')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')
const initialDataRoutes=require('./routes/admin/initialData')
const path= require('path')
const cors = require('cors');
// initialization
const app=express()
const env=require('dotenv')

env.config()
app.use(bodyParser.json())  //express json


/**
 * mongo db
 * 
 * mongodb+srv://justice_of_peace:<password>@cluster0.nj4bnqt.mongodb.net/?retryWrites=true&w=majority
 */

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.nj4bnqt.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
}).then(() => {
    console.log("database  connected");
})
    


// app.get('/',(req,res,next)=>{
//    res.status(200).json({
//        message:'hello from jp  hi'
//    })
// })
// app.post('/data',(req,res,next)=>{
//     res.status(200).json({
//         message:req.body
//     })
//  })
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)
app.use('/api',initialDataRoutes)

app.listen(process.env.PORT,()=>{
console.log(`server is running on port ${process.env.PORT}`)

})