import express from 'express';
const userRouter = express.Router();
import { multerUploadUser } from '../config/multer.js';
import { protect } from '../middleware/authMiddleware.js';
import checkUserBlocked from '../middleware/checkBlocked.js';
import {
  authUser,
  registerUser,
  logoutUser,
  createBlog,
  getUserBlogs,
  deleteBlog,
//   sendOtpCode,
//   verifyOTP,
} from '../controllers/userController.js';

// Register User (Checking for block status)
userRouter.post('/register', registerUser);

// userRouter.post('/send-otp', sendOtpCode);

//verify -otp
// userRouter.post('/verify-otp', verifyOTP);


// Authenticate User 
userRouter.post('/login', checkUserBlocked, authUser);

// Logout User
userRouter.post('/logout',  logoutUser);

// Create Blog (Checking for block status and protecting the route)
userRouter.post('/blogs', protect, checkUserBlocked, multerUploadUser.array('images', 3), createBlog);

// Get User Blogs (Checking for block status and protecting the route)
userRouter.get('/blogs', protect, checkUserBlocked, getUserBlogs);

// Delete Blog (Checking for block status and protecting the route)
userRouter.delete('/deleteBlog/:blogId', protect, checkUserBlocked, deleteBlog);

export default userRouter;
