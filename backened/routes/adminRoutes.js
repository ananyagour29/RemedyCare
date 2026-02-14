import express from 'express';
import  {adminLogin,approveCommentById,deleteCommentById,getAllBlogAdmin,getAllComments,getDashboard}  from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
const adminRoutes=express.Router();
adminRoutes.post('/login',adminLogin)
adminRoutes.get('/dashboard',auth,getDashboard)
adminRoutes.get('/blogs',auth,getAllBlogAdmin)
adminRoutes.get('/comments',auth,getAllComments)
adminRoutes.delete('/delete-comment',auth,deleteCommentById)
adminRoutes.post('/approve-comment',auth,approveCommentById)
export default adminRoutes;
