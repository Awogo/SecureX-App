import express from "express";
import prisma from "../prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Access denied." });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ buyerId: req.user.id }, { sellerId: req.user.id }],
      },
      orderBy: { createdAt: "desc" },
    });

    const completed = transactions.filter((txn) => txn.status === "completed");
    const pending = transactions.length - completed.length;
    const totalRevenue = completed.reduce((sum, txn) => sum + txn.amount, 0);

    return res.json({
      data: {
        totalTransactions: transactions.length,
        completedTransactions: completed.length,
        pendingTransactions: pending,
        totalRevenue,
        recentTransactions: transactions.slice(0, 5),
      },
    });
  } catch (error) {
    console.error("Dashboard route error:", error);
    return res.status(500).json({ message: "Unable to load dashboard data." });
  }
});

export default router;
