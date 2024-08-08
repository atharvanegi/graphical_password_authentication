import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { sendContactEmail } from './emailController.js';

export const makeContact = asyncHandler(async(req,res) => {
    const { email, name, message } = req.body;
    const user = await User.findOne({ email });
    if(!user){ 
        res.status(404).json({
            message:"This email id does not exist"
        })
    }
    else{ 
        sendContactEmail(name,email,message);
        res.status(200).json({ 
            message: "contact mail sent to admin, we will get back to you"
        })
    }
})