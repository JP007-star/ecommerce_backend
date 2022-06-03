const express =require('express')
const env=require('dotenv')
const bodyParser=require('body-parser')
const app=express()

env.config()
app.use(bodyParser.json())
app.get('/',(req,res,next)=>{
   res.status(200).json({
       message:'hello from jp  hi'
   })
})
app.post('/data',(req,res,next)=>{
    res.status(200).json({
        message:req.body
    })
 })
app.listen(process.env.PORT,()=>{
console.log(`server is running on port ${process.env.PORT}`)

})