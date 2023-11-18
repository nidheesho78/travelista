import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const generateAdminToken = (res,adminId) => {
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET_ADMIN || 'fallbackSecret',{
        
       expiresIn: '30d', 
    } );
    //  console.log(process.env.JWT_SECRET_ADMIN)
    res.cookie('jwtAdmin', token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 1000
    })
    return token
};

export default generateAdminToken