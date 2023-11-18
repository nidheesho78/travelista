import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser()); // Add this line to enable cookie parsing.


const generateUserToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallbackSecret', {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // Corrected this line
    });
    return token
}

export default generateUserToken;
