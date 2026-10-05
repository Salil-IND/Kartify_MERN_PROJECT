import express from 'express';
import { createProduct, getProducts, getProductById, filterProducts } from '../controllers/product.controllers.js';
const productRoutes = express.Router()

productRoutes.get("", getProducts, filterProducts);
productRoutes.post("", createProduct);
productRoutes.get("/:id", getProductById);




export default productRoutes;



