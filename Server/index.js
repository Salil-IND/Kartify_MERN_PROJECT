import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import customerRoutes from './routes/customer.routes.js';
import productRoutes  from './routes/product.routes.js';
import wishListRoutes from './routes/wishlist.routes.js';


//Setup 
dotenv.config(); 
const app = express(); 

mongoose.connect(process.env.dbUrl).then(()=>console.log("DB Connected")).catch((error)=>console.error(error))

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/customer', customerRoutes);
app.use("/products", productRoutes);
app.use('/wishlist', wishListRoutes)




app.listen(8001, ()=>{
    console.log('Server started on port 8001');
})

