
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOTPEmail } from "../utils/mailer.js";

const otpStore = new Map();

/* =========================
STEP 1: SEND OTP
========================= */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email required",
      });
    }

    const user = await User.findOne({ email });

    // ✔ Already logged in → direct login (NO OTP)
    if (user && user.isLoggedIn) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        token,
        message: "Welcome back",
      });
    }

    // ❗ NOT logged in → OTP required
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 5 * 60 * 1000;

    otpStore.set(email, { otp, expiry });

    await sendOTPEmail(email, otp);

    return res.json({
      success: true,
      message: "OTP sent",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
STEP 2: VERIFY OTP
========================= */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const data = otpStore.get(email);

    if (!data) {
      return res.json({ success: false, message: "OTP expired" });
    }

    if (Date.now() > data.expiry) {
      otpStore.delete(email);
      return res.json({ success: false, message: "OTP expired" });
    }

    if (data.otp != otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        role: "user",
        isLoggedIn: true,
      });
    } else {
      user.isLoggedIn = true;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    otpStore.delete(email);

    return res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
STEP 3: LOGOUT
========================= */
export const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email required" });
    }

    await User.findOneAndUpdate(
      { email },
      { isLoggedIn: false }
    );

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};