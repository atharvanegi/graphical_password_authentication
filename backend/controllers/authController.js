import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { welcomeEmail, sendLoginWarningEmail } from './emailController.js';
import { generateToken } from '../utils/generateToken.js';

const register = asyncHandler(async(req,res) => {
    const { name, email, passwordArray, passwordCollectionId } = req.body;
    const userExists = await User.findOne({email});
    console.log(passwordArray)
    if(passwordArray.length<4) res.status(400).json({ 
        message:"At least 4 images are required"
    })
    if(userExists){
        res.status(400).json({
            message:"User with this email already exists, Login instead"
        });
    }
    else{
        const user = await User.create({ 
            name, 
            email, 
            passwordArray, 
            lastLogin: Date.now(),
            passwordCollectionId
        })
        if(user){
            welcomeEmail(name,email);
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                lastLogin:user.lastLogin,
                joined:user.createdAt,
                token:generateToken(user._id),
            })
        }
        else{
            res.status(400).json({
                message:"Bad request or invalid data, please check"
            })
        }
    }
})

const validateEmail = asyncHandler(async(req,res) => {
    const { email } = req.params
    const type = req.originalUrl.split('/')[5]
    const findUser = await User.findOne({email});
    if(!findUser){
        if(type==="register"){
            res.status(200).json({
                message:"Email available",
                success:true,
                collectionId:Date.now()
            })
        }
        else{
            res.status(404).json({
                message:"This email id does not exist",
                success:false
            })
        }
    }
    else{
        if(type==="register"){
            res.status(400).json({
                message:"User with this email already exists",
                success:false
            })
        }
        else{
            res.status(200).json({
                message:"User valid",
                success:true,
                collectionId:findUser.passwordCollectionId
            })
        }
    }
})

const login = asyncHandler(async(req,res) => {
    const { email, passwordArray } = req.body;
    const findUser = await User.findOne({email});
    if(!findUser){
        res.status(404).json({
            message:"This email id does not exist"
        })
    }
    else{
        if(passwordArray.length!=findUser.passwordArray.length){
            sendLoginWarningEmail(findUser.name,findUser.email);
            await User.findOneAndUpdate({ email }, { attempts:findUser.attempts-1 })
            res.status(401).json({ message:`Unauthorized user, only ${findUser.attempts-1} attempts left` })
        }
        else if(findUser.attempts>0){
            if(await findUser.matchPassword(passwordArray)){
                await User.findOneAndUpdate({ email },{ lastLogin:Date.now(), attempts:3 });
                res.status(200).json({
                    _id: findUser._id,
                    name:findUser.name,
                    email:findUser.email,
                    isAdmin:findUser.isAdmin,
                    lastLogin : findUser.lastLogin,
                    attempts : findUser.attempts,
                    token: generateToken(findUser._id),
                })
            }
            else{
                await User.findOneAndUpdate({ email },{ attempts:findUser.attempts-1 });
                sendLoginWarningEmail(findUser.name,findUser.email);
                res.status(401).json({
                    message:`Invalid password only ${findUser.attempts-1} attempts left`
                })
            }
        }
        else{
            res.status(400).json({
                message:"You've reached max attempts contact admin"
            })
        }
    }
})

export { register, validateEmail, login }