import mongoose from 'mongoose'

const CustomerSchema = mongoose.Schema({
    fullName:{
        type: String,
        required : true
    },
    email:{
        type: String, 
        required : true,
    },
    contactNo:{
        type: String,
        required: true,
    },
    password:{
        type: String, 
        required: true,
    },
    
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],

}, {timestamps:true});


export const Customer = mongoose.model('customer', CustomerSchema);



