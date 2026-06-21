// // DELETE
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//         res.json({ success: true, token });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.json({ success: false, message: "Invalid password" });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//         res.json({ success: true, token });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };
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
        message: "Email required"
      });
    }

    let user = await User.findOne({ email });

    // Existing user => Direct login
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        token,
        message: "Welcome back"
      });
    }

    // New user => Send OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 5 * 60 * 1000;

    otpStore.set(email, {
      otp,
      expiry
    });

    console.log("Generated OTP:", otp);

    await sendOTPEmail(email, otp);

    return res.json({
      success: true,
      message: "OTP sent"
    });

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
STEP 2: VERIFY OTP
========================= */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.json({
        success: false,
        message: "Email and OTP required"
      });
    }

    const data = otpStore.get(email);

    if (!data) {
      return res.json({
        success: false,
        message: "OTP expired"
      });
    }

    if (Date.now() > data.expiry) {
      otpStore.delete(email);

      return res.json({
        success: false,
        message: "OTP expired"
      });
    }

    if (data.otp != otp) {
      return res.json({
        success: false,
        message: "Invalid OTP"
      });
    }

    let user = await User.findOne({ email });

    // First time user create
    if (!user) {
      user = await User.create({
        email,
        role: "user"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    otpStore.delete(email);

    return res.json({
      success: true,
      token,
      message: "Login successful"
    });

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
STEP 3: LOGOUT USER
========================= */
export const logoutUser = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};