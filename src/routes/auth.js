import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import upload from "../middleware/upload.js";
import verifyAccessToken from "../middleware/verifyAccessToken.js";

const router = express.Router();

router.post("/login", upload.none(), login);

router.post("/register", upload.none(), register);
router.get("/me", verifyAccessToken, getMe);

// Export the router
export default router;
