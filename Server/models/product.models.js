import mongoose from 'mongoose';


const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        requied:true,
        min:[1, "Must be greater than zero"],
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        min:[0, "Minimum Zero"]
    },
}, {timestamps:true})

export const Product = mongoose.model("product", ProductSchema);