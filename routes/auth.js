import express from "express";
import { login, register } from "../controllers/authController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/login", upload.none(), login);

router.post("/register", register);

// Export the router
export default router;
