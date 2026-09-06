import {Customer} from '../models/customer.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {genToken} from '../utils/generateToken.js';


const cookieOptions = {httpOnly:true,
}

export const registerCustomer = (req, res) => {
    const {fullName, email, password, phone} = req.body;

    //Input Validation 
    if (!fullName || !email || !phone || !password){
        res.status(400).json({
            error: 'All fields must be filled',
        })
    }

    if (password.length < 6){
        res.status(400).json({
            message: "Password is too short",
        })
    }

    const emailExists = Customer.findOne({email});

    if (emailExists){
        res.status(400).json({
            message:'User already exists with this email'
        })
    } 

    //Hashing 
    const salt = bcrypt.genSalt()
    const hashedPassword = bcrypt.hash(password, salt, 14);

    //Customer Creation
    
    const newCustomer = Customer.create({
        fullName: fullName,
        email:email,
        password:hashedPassword,
        phone:phone,
    })

    const token = genToken(newCustomer._id);

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        message: "Registered Successfully",
    })


}
