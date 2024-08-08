import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { sendOtpEmail } from './emailController.js'
import { generateHash } from '../utils/generateHash.js'
import { ulid } from 'ulid'

export const sendOtp = asyncHandler(async (req,res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if(user){
        const otp = ulid().slice(10,16)
        sendOtpEmail(user.name, email, otp)
        res.status(200).json({
            _id: user._id,
            otp:generateHash(otp),
            email: user.email,
            collectionId : user.passwordCollectionId
        })
    }
    else{
        res.status(404).json({ message:"User with that email not found" })
    }
})

export const resetPassword = asyncHandler(async (req,res) => {
    const { email, passwordArray, passwordCollectionId } = req.body
    const user = await User.findOne({email})
    if(user){
        user.name = user.name
        user.email = user.email
        user.passwordArray = passwordArray
        user.passwordCollectionId = passwordCollectionId
        user.isAdmin = user.isAdmin
        user.lastLogin = user.lastLogin
        const updatedUser = await user.save()
        res.json({
            _id:updatedUser._id,
            email: updatedUser.email,
            message:"Password Reset Successful"
        })
    }
    else{
        res.status(404).json({ message:"User with that email not found" })
    }
})