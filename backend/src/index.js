import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import transactionsRoutes from "./routes/transactions.js";
import dashboardRoutes from "./routes/dashboard.js";
import paymentRoutes from "./routes/payment.js";
import chatbotRoutes from "./routes/chatbot.js";
import { generalLimiter } from "./middleware/rateLimitMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SecureX backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`SecureX backend listening on port ${port}`);
});

// Ping own health endpoint every 14 min to prevent Render free tier from sleeping
if (process.env.NODE_ENV === "production" && process.env.RENDER_EXTERNAL_URL) {
  setInterval(async () => {
    try {
      await fetch(`${process.env.RENDER_EXTERNAL_URL}/api/health`);
      console.log("[keep-alive] pinged health endpoint");
    } catch (err) {
      console.error("[keep-alive] ping failed:", err.message);
    }
  }, 14 * 60 * 1000);
}
