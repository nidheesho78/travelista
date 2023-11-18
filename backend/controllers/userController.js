import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateUserToken from '../utils/generateUserToken.js';
import Blog from '../models/createBlog.js';
import Category from '../models/categoryModel.js';
// import { sendOtp,verifyCode } from './otpController.js';


// const SENDER_EMAIL = 'lisandro.fisher@ethereal.email';
// const GENERATE_ETHREAL_PASSWORD = 'SyqhW2pTpFSR6aHPgn';



const authUser = asyncHandler(async (req, res) => {
  console.log('login user');
  console.log(req.body);

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    // User not found, send an error message
    res.status(404).json({ error: 'User not found' });
    return;
  }

  if (user.is_blocked) {
    // User is blocked, send an error message
    res.status(401).json({ error: 'Your account is temporarily blocked' });
    return;
  }

  if (user && (await user.matchPassword(password))) {
    const token = generateUserToken(res, user._id);
    console.log('token',token);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});



//Register without otp
// const registerUser = asyncHandler(async(req,res) =>{
//     console.log('data body',req.body);
//     const {name,email,mobile,password} = req.body
//     const userExist = await User.findOne({email})
//     if(userExist){
//         res.status(400);
//         throw new Error('User Already Exist')
//     }
//     const user = await User.create({
//         name,
//         email,
//         mobile,
//         password
//     })
//     if(user){
//         generateUserToken(res,user._id)
//         res.status(201).json({
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             mobile:user.mobile,
//             profileImageName:user.profileImageName

//         })
//     }else{
//         res.status(400)
//         throw new Error('Invalid User Data')
//     }
// })
//register using email otp

// const verifyOTP = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;

//   // Find the user by email
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(400).json({ message: 'User not found' });
//   }

//   // Compare the user's stored OTP with the provided OTP
//   if (user.otp === otp) {
    
//      // Update the verified field to true
//      user.verified = true;
    
//      // Save the user object with the updated verified field
//      await user.save();
   
         
//     res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         profileImage: user.profileImage,
//     });
    
//   } else {
//     res.status(400).json({ message: 'Invalid OTP' });
//   }



// });

// const resendOtp = asyncHandler(async(req,res)=>{
//   try {
//     const userId = req.user._id; // Assuming you have access to the user ID from the authenticated session
//     // console.log("---------");
//     // console.log(userId);
//     // console.log("-------------");
//     const user = await User.findById(userId);
//     console.log('User',user)

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate a new OTP
//     const newOtp = Math.floor(1000 + Math.random() * 9000);
//     console.log('newOtp:',newOtp)
//     // Update the user's OTP in the database
//     user.otp = newOtp;
    
//     await user.save();

//     // Send the new OTP to the user's email
//     await sendOTPByEmail(user.email, newOtp);

//     res.status(200).json({ message: 'OTP resent successfully' });
//   } catch (error) {
//     console.error('Error while resending OTP:', error);
//     res.status(500).json({ message: 'An error occurred while resending OTP' });
//   }
// })

// const sendOTPByEmail = async(email,otp) => {
//     const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: SENDER_EMAIL,
//         pass: GENERATE_ETHREAL_PASSWORD
//     }
// });

// const mailOptions = {
//     from: SENDER_EMAIL,
//     to:email,
//     subject:'OTP Verification',
//     text:`Your OTP for verification is: ${otp} `,
// };
// await transporter.sendMail(mailOptions);
// }



// /Register using otp
const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, mobile, password } = req.body;

    // Check if the user with the given email already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: 'User Already Exists' });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password, 
    }); 

    if (user) {
      const token = generateUserToken(res,user._id);token
      console.log('token',token)
      res.status(201).json({
        _id: user._id, 
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token
      }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Invalid User Data' });
  }
};


// const sendOtpCode = async (req,res,next) =>{
//    try {   
//     const mobile = req.body.mobile
//     console.log('mobile',mobile)
//     await sendOtp(mobile)
//     res.status(201).json({mobile})
//    } catch (error) {
//     next(error)
//    }

// }
// const verifyOTP = async (req,res,next) =>{
//     try {
//      const {mobile,otp} = req.body
//      const code = otp
//      const verified = await verifyCode(mobile,code)
//      if(verified===false){
//         res.status(400);
//         throw new Error('Wrong OTP Entered') 
//      }
//      res.status(200).json({mobile})
//     } catch (error) {  
//          next(error)
//     } 
 
//  }



const logoutUser = asyncHandler(async (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date()
    })
   
    res.status(200).json({message:'User Logged Out'})
});


const createBlog = asyncHandler(async(req,res) => {
    try{
        const {title,category,summary,content,author} = req.body;

        const files = req.files.map(file => file.path);
        console.log('Uploaded Files:',files);

         const categoryObject = await Category.findOne({ name: category });

        if (!categoryObject) {
            // Handle the case where the specified category doesn't exist
            return res.status(400).json({ message: 'Category not found' });
        }

        const newBlog = new Blog({
            title,
            category:categoryObject,
            summary,
            content,
            images:files,
            author,
            
        });

        const createdBlog = await newBlog.save();
        console.log('created blog',createdBlog)
        res.status(201).json(createBlog);
    }catch(error){
        res.status(500).json({
            message:'Blog creation failed'
        })
    }
});

const getUserBlogs = asyncHandler(async(req,res) => {
    try{
        const userId = req.user._id;
        console.log('user',userId)
        const blogs = await Blog.find({author:userId})
        .select('title summary createdAt images')
        .sort({createdAt: -1})

        res.status(200).json(blogs);
    }catch(error) {
        res.status(500).json({message:'Error fetching blogs.'})
    }
});

 const allUsersBlogs = asyncHandler(async (req, res) => {
    try {
      // Fetch all blogs in db oredr like latest first
      const blogs = await Blog.find({ })
        .select('title summary createdAt images') // Only select specific fields
        .sort({ createdAt: -1 }); // Sort by creation date in descending order
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs.' });
    }
  });

const deleteBlog = asyncHandler(async(req,res) => {
    const blogId = req.params.blogId;
    
    try{
        const blog = await Blog.findByIdAndDelete(blogId);
        if(!blog){
            res.status(404).json({message:'Blog not found'});

        }else{
            res.json({message:'Blog deleted successfully'});

        }
    }catch(error) {
        console.error('Error deleting blog:',error);
        res.status(500).json({message: 'An error occurred while deleting the blog'});
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    // getUserProfile,
    // updateUserProfile
    createBlog,
    getUserBlogs,
    deleteBlog,
    // sendOtpCode,
    // verifyOTP,
    // resendOTP

}