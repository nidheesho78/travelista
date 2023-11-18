import express from 'express';
const adminRouter = express.Router();
// import { protect } from '../middleware/authMiddleware.js';
import { 
    createCategory,
     getCategories,
      unlistCategory,
       listCategory,
       updateCategory, 
       deleteCategory, 
       
    } from'../controllers/categoryController.js';



import {
    authAdmin,
    logoutAdmin,
    dashboard,
    getAllUser,
    getUserByEmail,
    blockUser,
    unBlockUser
    

}from '../controllers/adminController.js';

adminRouter.post('/login',authAdmin);
adminRouter.post('/logout',logoutAdmin);
adminRouter.get('/dashboard',dashboard);
adminRouter.get('/get-users',getAllUser);
adminRouter.get('/userProfile',getUserByEmail); 
adminRouter.put('/block-user/:userId',blockUser)
adminRouter.put('/unblock-user/:userId',unBlockUser)
adminRouter.get('/category',getCategories);
adminRouter.post('/add-category',createCategory);
adminRouter.put('/categories/unlist/:categoryId',unlistCategory);
adminRouter.put('/categories/list/:categoryId',listCategory);
adminRouter.put('/categories/update/:categoryId',updateCategory);
adminRouter.delete('/categories/:categoryId',deleteCategory);  







   
export default adminRouter