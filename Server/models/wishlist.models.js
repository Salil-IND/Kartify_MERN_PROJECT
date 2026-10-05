import mongoose from "mongoose";

const WishListSchema = mongoose.Schema({
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],

    customerId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer"
    }

})