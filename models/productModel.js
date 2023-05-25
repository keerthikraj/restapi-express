const mongoose= require('mongoose')

const productSchemas= mongoose.Schema({
name:{
    type: String,
    required: [true, "name is required"]
},
quantity:{
    type: Number,
    required: true,
    default: 0
},
price:{
    type: Number,
    required: true
}
},
{
    timestamps: true
})

const Product = mongoose.model('Product',productSchemas)
module.exports= Product;