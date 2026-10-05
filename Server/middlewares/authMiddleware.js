import jwt from 'jsonwebtoken'
import {Customer} from '../models/customer.models.js'



export const isAuthenticated = async (req, res, next)=>{
  const token = req.cookies.token;

  if (!token){
    return res.status(401).json({
      message:"Unauthorised"
    })
  }


  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

  const customer = await Customer.findById(decoded.userId)

  if (!customer){
    return res.status(401).json({
      message:"User Not Found"
    })
  }

  req.customerData = customer

  next();
}
