import express from "express";
import { sendMessage } from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Send message to AI chatbot (requires authentication)
router.post("/message", protect, sendMessage);

export default router;
