import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { getConversationMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.use(protectedRoute);

router.post("/send", sendMessage);
router.get("/conversation/:userId", getConversationMessages);

export default router;