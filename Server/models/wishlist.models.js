import mongoose from "mongoose";

const WishListSchema = mongoose.Schema({
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],

    customerId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        unique:true,
        required:true,
    }   

}, {timestamps:true})

export const Wishlist = mongoose.model("wishlist", WishListSchema);