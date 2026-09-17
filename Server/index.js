import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import customerRoutes from './routes/customer.routes.js';


//Setup 
dotenv.config(); 
const app = express(); 

mongoose.connect(process.env.dbUrl).then(()=>console.log("DB Connected")).catch((error)=>console.error(error))

app.use(express.json());
app.use(cookieParser());

app.use('/customer', customerRoutes);




app.listen(8001, ()=>{
    console.log('Server started on port 8001');
})

