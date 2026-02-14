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
