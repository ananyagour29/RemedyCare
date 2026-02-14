// main file of backedned server
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
// DELETE
// import userRouter from "./routes/userRoutes.js";
// DELETE
const app=express(); //server create hogya
// dotenv.config();
await connectDB(); //database connect hogya
// Middleware
// app.use(cors());
app.use(cors({
  origin: "https://note-it-3kpw.vercel.app", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.get('/',(req,res)=>{ //route define hogya
    res.send("API is running...");
});
app.use('/api/admin',adminRoutes); //admin routes use kr rhe
app.use('/api/blog',blogRouter); //blog routes use kr rhe
// DELETE
// app.use("/api/user", userRouter);
// Delete
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log('Server running on port'+ PORT);
}); //server start hogya
export default app;
// Ye file Express backend ka entry point hai jahan
//  server create hota hai, middleware set hota hai, routes define hote hain aur server start hota hai.