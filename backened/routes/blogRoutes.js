import express from "express";
import {
  addBlog,
  getBlogComments,
  addComment,
  getAllBlogs,
  deleteBlogById,
  getBlogById,
  togglePublish,
  generateContent
} from "../controllers/blogController.js";

import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

/* =====================
   ADMIN ROUTES
===================== */

blogRouter.post(
  "/add",
  auth,
  upload.single("image"),
  addBlog
);

blogRouter.delete(
  "/delete/:id",
  auth,
  deleteBlogById
);

blogRouter.post(
  "/toggle-publish",
  auth,
  togglePublish
);

blogRouter.post(
  "/generate",
  auth,
  generateContent
);

/* =====================
   PUBLIC ROUTES
===================== */

blogRouter.get("/all", getAllBlogs);

blogRouter.get("/:blogId", getBlogById);

blogRouter.post("/add-comment", addComment);

blogRouter.post("/comments", getBlogComments);

export default blogRouter;