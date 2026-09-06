import express from 'express';


//Importing COntrollers
import {registerCustomer} from '../controllers/customer.controllers.js';




//Routes
const customerRoutes = express.Router();

customerRoutes.post('register', registerCustomer);
customerRoutes.get('me');
customerRoutes.post('login');
customerRoutes.post('logout');
