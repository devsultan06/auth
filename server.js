import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./src/routes/auth.js";
import notFound from "./src/middleware/notFound.js";
import errorHandler from "./src/middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/config/database.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", auth);

// Middleware

app.use(notFound);

app.use(errorHandler);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();
