import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const JWT_KEY = process.env.JWT_SECRET;

//for user authentication and verification of token sent while logging in
const authenticate = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,JWT_KEY);
            req.user = await User.findById(decoded.id);
        }
        catch(error){
            res.status(401).json({
                message:"Token failed, Sign in again",
                error
            })
        }
    }
    if(!token){
        res.status(401).json({
            message:"Not authorized",
        })
    }
    next();
})


//for checking if the use ris admin or not
const admin = asyncHandler(async(req,res,next) => {
    if(req.user && req.user.isAdmin) next();
    else res.status(401).json({
        message:"Not an admin"
    })
})

export { authenticate, admin };