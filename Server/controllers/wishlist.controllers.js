import  {Customer} from "../models/customer.models.js";
import {Product} from "../models/product.models.js";

export const addToWishList = async (req, res)=>{
    const {productId} = req.params;

    if(!productId){
        return res.status(400).json({
            message:"Could not add to wishlist. Missing Product Id"
        })
    }

    const product = await Product.findById(productId);

    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    const customerId = req.customerData._id;
    const customer = await Customer.findById(customerId)

    const addedAlready = (customer.wishlist.some((id)=>id.equals(productId)));

    if(!addedAlready){
        customer.wishlist.push(productId);
        await customer.save();
        return res.status(201).json({
            message:"Added to Wishlist"
        })
    }

    return res.status(200).json({
        message:"Already in wishlist"
    })
    
}

export const removeFromWishList = async (req, res)=>{
    const {productId} = req.params;

    const customerId = req.customerData._id;

    const customer = await Customer.findById(customerId)

    const wishlistContains = (customer.wishlist.some((id)=>id.equals(productId)))

    if(wishlistContains){
        await customer.wishlist.pull(productId);

        customer.save()

        return res.status(204).end()
    }
    return res.status(404).json({
        message:"The product does not exist in wishlist"
    })
    
}

export const getWishList = async(req, res) =>{
    const customerId = req.customerData._id;

    const customer = await Customer.findById(customerId)

    return res.status(200).json({
        wishlist:customer.wishlist,
    })
}