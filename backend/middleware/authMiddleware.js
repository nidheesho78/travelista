import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config()
// const JWT_SECRET_USER = 'wngaonaibn';

const protect = asyncHandler(async(req,res,next) => {
    let token
    token = req.cookies.jwt
    if(token){
        try{
          const decoded = jwt.verify(token,process.env.JWT_SECRET_USER) 
          req.user = await User.findById(decoded.userId).select('-password') 
          next()
        }catch(error){
            res.status(401);
            throw new Error("Not Authorized,invalid token")
        }
    }else{
        res.status(401)
        throw new Error("Not Authorized no token")
    }
});

export {protect}