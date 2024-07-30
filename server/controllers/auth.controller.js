import mongoose from 'mongoose'
import User from '../models/User.model.js'
import bcrypt from 'bcrypt'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=>{
    try{
        const hashPass = await bcrypt.hash(req.body.password,10)
        // console.log(hashPass)
        const newUser = new User({...req.body, password: hashPass})
        await newUser.save();
        res.status(200).send("User Has Been Created")
    }catch(err){
        next(err);
    }
}

export const signin = async (req,res,next)=>{
    try{
        const user = await User.findOne({name: req.body.name})
        if(!user) return next(createError(404,"User Not Found"))
        const isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return next(createError(400,"Invalid Credentials"))
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRETKEY)
        // console.log(token)
        res.cookie("access_token", token,{
            httpOnly:true
        })
        .status(200)
        .json(user)
    }catch(err){
        next(err);
    }
}