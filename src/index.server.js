const express =require('express')
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const userRoutes=require('./routes/user')

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

app.use('/api',userRoutes)
app.listen(process.env.PORT,()=>{
console.log(`server is running on port ${process.env.PORT}`)

})