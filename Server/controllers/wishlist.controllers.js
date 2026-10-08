import mongoose from "mongoose";
import  {Customer} from "../models/customer.models.js";
import {Product} from "../models/product.models.js";
import { Wishlist } from "../models/wishlist.models.js";

export const addToWishList = async (req, res)=>{
    const {productId} = req.params;


    //Validating the product ID
    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            message:"Invalid Product Id"
        })
    }
    

    const product = await Product.findById(productId);

    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    //Getting the customer id to check if wishlist already exists
    const customer = req.customerData

    const customerId = customer._id;

    let wishlist = await Wishlist.findOne({customerId})

    if(!wishlist){
        wishlist = await Wishlist.create({products:[productId], customerId})
        return res.status(201).json({
            message:"Wishlist created with new item added"
        });
    }

    const addedAlready = (wishlist.products.some((id)=>id.equals(productId)));

    if(!addedAlready){

        wishlist.products.push(productId);
        await wishlist.save();
        return res.status(200).json({
            message:"Added to Wishlist"
        })
    }

    return res.status(409).json({
        message:"Already in wishlist"
    })
    
}

export const removeFromWishList = async (req, res)=>{
    const {productId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            message:"Invalid product id"
        })
    }
    //Get the customer ID
    const customer = req.customerData;
    const customerId = customer._id;

    //Get the Wishlist
    const wishlist = await Wishlist.findOne({customerId})

    if(!wishlist){
        await Wishlist.create({products:[], customerId})
    }

    const wishlistContains = (wishlist.products.some((id)=>id.equals(productId)))

    if(wishlistContains){
        await wishlist.products.pull(productId);

        await wishlist.save();

        return res.status(200).json({
            success:true,
            message:"Removed Successfully"
        })
    }

    return res.status(404).json({
        message:"The product does not exist in wishlist"
    })
    
}

export const getWishList = async(req, res) =>{
    const customerId = req.customerData._id;

    const wishListData = await Wishlist.findOne({customerId}).populate("products");

    if(!wishListData){
        await Wishlist.create({products:[], customerId})
        return res.status(200).json({
            success:true,
            count:0,
            products:[],
        })
    }

    return res.status(200).json({
        success:true,
        count:wishListData.products.length,
        products:wishListData.products,
    })
}