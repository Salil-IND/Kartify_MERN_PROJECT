import express from "express";
import {isAuthenticated} from '../middlewares/authMiddleware.js'
import { addToWishList, getWishList, removeFromWishList } from "../controllers/wishlist.controllers.js";


const wishListRoutes = express.Router()

wishListRoutes.get("", isAuthenticated, getWishList)
wishListRoutes.post("/:productId", isAuthenticated, addToWishList)
wishListRoutes.delete("/:productId", isAuthenticated, removeFromWishList)


export default wishListRoutes;