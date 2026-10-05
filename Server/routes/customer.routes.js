import express from 'express';


//Importing COntrollers
import {isAuthenticated} from '../middlewares/authMiddleware.js';
import {registerCustomer, loginUser, getUser, logOutUser} from '../controllers/customer.controllers.js';


//Routes
const customerRoutes = express.Router();

customerRoutes.post('/register', registerCustomer);
customerRoutes.get('/me', isAuthenticated, getUser);
customerRoutes.post('/login', loginUser);
customerRoutes.get('/logout', logOutUser);

export default customerRoutes;
