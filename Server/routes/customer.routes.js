import express from 'express';


//Importing COntrollers
import {isAuthenticated} from '../middlewares/authMiddleware.js';
import {registerCustomer, loginUser, getUser} from '../controllers/customer.controllers.js'


//Routes
const customerRoutes = express.Router();

customerRoutes.post('register', registerCustomer);
customerRoutes.get('me', isAuthenticated, getUser);
customerRoutes.post('login', loginUser);
//customerRoutes.post('logout');

export default customerRoutes;
