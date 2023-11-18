import express from 'express' ;
import dotenv from 'dotenv';
// dotenv.config();
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connect from './config/db.js';
const port = process.env.PORT || 5000;
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
connect()
dotenv.config({ path: "./env" });
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
 const corsOptions = { 
    origin:true,
    credentials:true
 }
app.use(cors(corsOptions));
app.use(express.static('backend/Public'));
 
app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);

app.get('/',(req,res) => res.send('server is ready'));
app.use(notFound)
app.use(errorHandler)
console.log('port',process.env.PORT)
app.listen(port,() => console.log(`server started on port ${port}`)); 