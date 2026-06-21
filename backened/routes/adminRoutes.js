// import express from 'express';
// import  {adminLogin,approveCommentById,deleteCommentById,getAllBlogAdmin,getAllComments,getDashboard}  from '../controllers/adminController.js';
// import auth from '../middleware/auth.js';
// const adminRoutes=express.Router();
// adminRoutes.post('/login',adminLogin)
// adminRoutes.get('/dashboard',auth,getDashboard)
// adminRoutes.get('/blogs',auth,getAllBlogAdmin)
// adminRoutes.get('/comments',auth,getAllComments)
// adminRoutes.delete('/delete-comment',auth,deleteCommentById)
// adminRoutes.post('/approve-comment',auth,approveCommentById)
// export default adminRoutes;
import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogAdmin,
  getAllComments,
  getDashboard
} from "../controllers/adminController.js";

import auth from "../middleware/auth.js";
// import isAdmin from "../middleware/isAdmin.js";

const adminRoutes = express.Router();

/* =====================
   PUBLIC ADMIN LOGIN
===================== */
adminRoutes.post("/login", adminLogin);

/* =====================
   PROTECTED ADMIN ROUTES
===================== */
adminRoutes.get("/dashboard", auth,  getDashboard);
adminRoutes.get("/blogs", auth, getAllBlogAdmin);
adminRoutes.get("/comments", auth, getAllComments);

/* =====================
   COMMENT ACTIONS
===================== */
adminRoutes.delete("/comments/:id", auth,  deleteCommentById);
adminRoutes.post("/comments/approve", auth, approveCommentById);

export default adminRoutes;