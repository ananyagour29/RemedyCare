import express from "express";
import {
  sendOtp,
  verifyOtp,
  logoutUser
} from "../controllers/userController.js";

const userRoutes = express.Router();

/* =====================
   USER AUTH ROUTES
===================== */

// Send OTP
userRoutes.post("/send-otp", sendOtp);

// Verify OTP & Login
userRoutes.post("/verify-otp", verifyOtp);

// Logout Device
userRoutes.post("/logout", logoutUser);

export default userRoutes;