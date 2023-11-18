import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import generateAdminToken from '../utils/generateAdminToken.js';
import User from '../models/userModel.js';


  
export const authAdmin = asyncHandler(async (req, res) => {
    const {  email, password } = req.body;
    const admin = await Admin.findOne({ email }); 

    if (admin) {
        // An admin with the given email was found
        if (admin.password === password) {
           const token = generateAdminToken(res, admin._id);
            res.status(201).json({
                _id: admin._id,
                email: admin.email,
                token
            }); 
        } else {
            res.status(401).json({ message: 'Invalid Email or Password' });
        }
    } else {
        // No admin with the given email was found
        res.status(401).json({ message: 'Admin not found' });
    }
});

export const dashboard = asyncHandler (async(req,res) => {
console.log('dashboard')
})

export const logoutAdmin = asyncHandler (async (req,res) => {
 res.cookie('jwtAdmin','',{
    httpOnly:true,
    expires:new Date()
   })
res.status(200).json({message:'Admin Logged Out'})
});


export const getAllUser = asyncHandler ( async (req,res) => {
const userData = await User.find({},{name: 1,email:1})
console.log('userData',userData)
if(userData){
    res.status(200).json({userData})
}else{
    res.status(400)
    throw new Error('Error Fetching data')
}
});



export const getUserByEmail = asyncHandler(async (req,res) => {
    const {email} = req.query;
    const foundUser = await User.findOne({email});
    if(foundUser) {
        res.status(200).json({
            _id:foundUser._id,
            name:foundUser.name,
            email:foundUser.email,
            profileImage:foundUser.profileImage,
        })
    }else{
     res.status(400);
     throw new Error('User not found');
    }
});

  // Retrieve All Blogs from All Users
// export const allUsersBlogs = asyncHandler(async (req, res) => {
//     try {
//       const { email } = req.query;
  
//       // Find the user based on the email
//       const foundUser = await User.findOne({ email });
  
//       if (!foundUser) {
//         return res.status(404).json({ message: 'User not found.' });
//       }
  
//       // Fetch blogs for the selected user's ObjectId
//       const blogs = await Blogs.find({ author: foundUser._id })
//         .select('title summary createdAt images') // Only select specific fields
//         .sort({ createdAt: -1 }); // Sort by creation date in descending order
  
//       res.status(200).json(blogs);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching blogs.' });
//     }
//   });


export const blockUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    console.log('user',userId) // Assuming you get the userId from the URL or request parameters
    try {
        const user = await User.findById(userId);
        console.log('user',user)

        if (user) {
            user.is_blocked = true; // Set the 'blocked' field to true to block the user
            await user.save();

            res.status(200).json({ success: true, message: 'User Blocked Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User Not Found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to block the user' });
    }
});

export const unBlockUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId; // Assuming you get the userId from the URL or request parameters
    try {
        const user = await User.findById(userId);
        console.log('user',user)

        if (user) {
            user.is_blocked = false; // Set the 'blocked' field to true to block the user
            await user.save();

            res.status(200).json({ success: true, message: 'User UnBlocked Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User Not Found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to unblock the user' });
    }
});
