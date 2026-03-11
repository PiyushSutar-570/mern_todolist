import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
export const register = async(req,res) =>{
    try{
    const {name , email , password} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.json({
            success : false,
            message : 'User already exists !'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User({
        name , 
        email , 
        password : hashedPassword
    });

    await newUser.save();

    if(newUser){
        res.status(200).json({
            success : true ,
            message : 'The user registered successfully !'
        })
    }
    else{
        res.status(403).json({
            success : false ,
            message : 'The user is unable to register !'
        })
    }
    }
    catch(error){
        console.log(error.message);
        return  res.status(500).json({
            success : false,
            message : 'Something went wrong !'
        })
    }
}

export const login = async(req,res)=>{
    try {
        const {email , password} = req.body;
     
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success : false,
                message : 'User does not exist!'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(404).json({
                success : false,
                message : 'Invalid crendetials !'
            })
        }

        const accessToken = jwt.sign({
            userId : user._id,
            name : user.name,
            email : user.email
        },process.env.JWT_SECRET_KEY,{expiresIn : '7d'})

        res.json({
            success : true,
            message : 'User logged-in successfully !',
            accessToken
        })

    } catch (error) {
        console.log(error.message);
        return  res.status(500).json({
            success : false,
            message : 'Something went wrong !'
        })
    }
}