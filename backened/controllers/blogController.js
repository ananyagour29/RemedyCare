
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

/* =========================
   👮 ADMIN ONLY (ADD BLOG)
========================= */
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } =
      JSON.parse(req.body.blog);

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280 },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res.json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   🌍 PUBLIC - GET BLOGS
========================= */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      isPublished: true,
    }).sort({ createdAt: -1 });

    const updatedBlogs = blogs.map((blog) => {
      const hoursDiff =
        (Date.now() - new Date(blog.createdAt).getTime()) /
        (1000 * 60 * 60);

      return {
        ...blog._doc,
        isNew: hoursDiff <= 48,
      };
    });

    res.json({
      success: true,
      blogs: updatedBlogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   🌍 PUBLIC - GET BLOG BY ID
========================= */
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   👮 ADMIN ONLY - DELETE BLOG
========================= */
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   👮 ADMIN ONLY - TOGGLE
========================= */
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: "Blog status updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   👤 USER - ADD COMMENT
========================= */
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    const userId = req.user?.id || null;

    await Comment.create({
      blog,
      name,
      content,
      userId,
    });

    res.json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   🌍 PUBLIC - GET COMMENTS
========================= */
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   🤖 AI CONTENT GENERATOR
========================= */
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const content = await main(
      prompt +
        " Generate a very short blog content in simple text, only a few sentences."
    );

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
