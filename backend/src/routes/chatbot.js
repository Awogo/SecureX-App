import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required." });
    }

    const reply = `SecureX AI says: Based on your request, we recommend focusing on clear escrow status updates and building seller trust with delivery OTP verification. Current message: ${message}`;
    return res.json({ data: { response: reply } });
  } catch (error) {
    console.error("Chatbot error:", error);
    return res.status(500).json({ message: "Unable to process chatbot request." });
  }
});

export default router;
