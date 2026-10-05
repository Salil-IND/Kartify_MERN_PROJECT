import {Customer} from '../models/customer.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {genToken} from '../utils/generateToken.js';
import customerRoutes from '../routes/customer.routes.js';


const cookieOptions = {httpOnly:true,
}

export const registerCustomer = async (req, res) => {
    const {fullName, email, password, phone} = req.body;

    //Input Validation 
    if (!fullName || !email || !phone || !password){
        return res.status(400).json({
            error: 'All fields must be filled',
        })
    }

    if (password.length < 6){
        return res.status(400).json({
            message: "Password is too short",
        })
    }

    const emailExists = await Customer.findOne({email});

    if (emailExists){
        return res.status(400).json({
            message:'User already exists with this email'
        })
    } 

    //Hashing 
    const salt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Customer Creation
    
    const newCustomer = await Customer.create({
        fullName: fullName,
        email:email,
        password:hashedPassword,
        contactNo: phone,
    })

    // const token = genToken(newCustomer._id);

    // res.cookie('token', token, cookieOptions);

    res.status(201).json({
        message: "Registered Successfully",
    })


}



export const getUser = (req, res)=> {
  if (!req.customerData){
    return res.status(404).json({
      message:"User Not Found"
    })
  }
  
  return res.status(200).json({
      message:"User Info was Found",
      customerData: req.customerData
  })

}

export const loginUser = async (req, res)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({
            message:"All fields must be filled!"
        })
    }

    const customer = await Customer.findOne({email})

    if(!customer){
        return res.status(404).json({
            message: "User not found. Please register first"
        })
    }

    const passwordCheck = await bcrypt.compare(password, customer.password)

    if (!passwordCheck){
        return res.status(400).json({
            message: "Password is incorrect!"
        })
    }

    const token = genToken(customer._id);

    res.cookie('token', token, cookieOptions);

    return res.status(200).json({
        message: 'Welcome Back!',
        customerData:customer,
    })

}


export const logOutUser = (req, res) =>{
    const token = req.cookies.token

    if (token){
        res.clearCookie("token", cookieOptions)
    }

    return res.status(200).json({
        message:'Logged Out Successfully'
    })
}


