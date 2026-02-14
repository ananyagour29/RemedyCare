// // main file of backedned server
// import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import adminRoutes from './routes/adminRoutes.js';
// import blogRouter from './routes/blogRoutes.js';
// // DELETE
// // import userRouter from "./routes/userRoutes.js";
// // DELETE
// const app=express(); //server create hogya
// // dotenv.config();
// await connectDB(); 
// // Middleware
// app.use(cors());
// // app.use(cors({
// //   origin: "https://note-it-3kpw.vercel.app", 
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //    allowedHeaders: ["Content-Type", "Authorization"],
// //   credentials: true
// // }));
// // Handle preflight OPTIONS requests for all routes
// // app.options("*", cors());
// app.use(express.json());
// app.get('/',(req,res)=>{ //route define hogya
//     res.send("API is running...");
// });
// app.use('/api/admin',adminRoutes); //admin routes use kr rhe
// app.use('/api/blog',blogRouter); //blog routes use kr rhe
// // DELETE
// // app.use("/api/user", userRouter);
// // Delete
// const PORT=process.env.PORT||3000;
// app.listen(PORT,()=>{
//     console.log('Server running on port'+ PORT);
// }); //server start hogya
// export default app;
// // Ye file Express backend ka entry point hai jahan
// //  server create hota hai, middleware set hota hai, routes define hote hain aur server start hota hai.
// server.js
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";

const app = express();

// Middleware
app.use(express.json());

// Full CORS setup for your frontend
app.use(cors({
  origin: "https://note-it-3kpw.vercel.app",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests
// app.options("*", cors());

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRouter);

// Root route
app.get("/", async (req, res) => {
  try {
    await connectDB(); // connect inside route for serverless
    res.send("API is running!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

export default app;
