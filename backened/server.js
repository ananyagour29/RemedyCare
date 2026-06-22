
import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./configs/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

/* =====================
   DATABASE
===================== */
await connectDB();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* =====================
   TEST ROUTE
===================== */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =====================
   ROUTES
===================== */

app.use("/api/admin", adminRoutes);

app.use("/api/blog", blogRouter);

app.use("/api/user", userRoutes);

/* =====================
   SERVER
===================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});