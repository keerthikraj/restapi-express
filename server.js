const mongodb= require('mongodb')
const express = require('express')
const mongoose= require('mongoose')
const app= express();
const Product=require('./models/productModel')
require('dotenv').config();

mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to MongoDb..!")
    app.listen(3000,()=>{
    console.log("server connected...!")
    })
}).catch((error)=>{
    console.log(error)
})

app.use(express.json());
// getAllDatas
app.get('/product',async (req,res)=>{
    try{
        const products= await Product.find({})
        res.status(200).json(products)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
// createData
app.post('/product',async(req,res)=>{
   try{
    const product= await Product.create(req.body)
    res.status(200).json(product)

   }catch(error){
    console.log(error.message)
   res.status(500).json({message:error.message})
}
})
//readDatabyId
app.get('/product/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const products=await Product.findById(id)
        res.status(200).json(products) 
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
// updateDataById
app.put('/product/:id',async (req,res)=>{
    try{
        const {id}= req.params;
        const product= await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:'cannot  find id'})
        }
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
//DeleteDataById
app.delete('/product/:id',async(req,res)=>{
    try{
        const{id}= req.params
        const product= await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({message:`{id} not found`})
        }
        res.status(200).json(product)
    }catch{
        console.log(error.message)
        res.status(500).json({message: error.message})
    } 
})

