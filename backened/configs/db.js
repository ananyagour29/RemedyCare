// import mongoose from "mongoose";
// const connectDB=async()=>{
//     try{
//         // await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`);
//         //    console.log(process.env.MONGODB_URI); 
//     await mongoose.connect(process.env.MONGODB_URI);
//         console.log("mongodb connected");
//     }catch(error){
//         console.log(error.message);
//     }
// }
// export default connectDB;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    // No extra options needed in Mongoose 7+
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
