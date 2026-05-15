import express from "express";
import prisma from "../prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateOtp } from "../utils/helpers.js";

const router = express.Router();

const isAuthorizedTransaction = (transaction, user) => {
  return (
    transaction.sellerId === user.id ||
    transaction.buyerId === user.id ||
    (transaction.otherPartyEmail && transaction.otherPartyEmail === user.email)
  );
};

router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ sellerId: req.user.id }, { buyerId: req.user.id }],
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ data: transactions });
  } catch (error) {
    console.error("Transaction list error:", error);
    return res.status(500).json({ message: "Unable to fetch transactions." });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      transactionType,
      item,
      description,
      amount,
      currency,
      otherPartyEmail,
      otherPartyPhone,
      setDeliveryDays,
    } = req.body;

    if (!transactionType || !item || !amount || !currency) {
      return res.status(400).json({ message: "Missing transaction fields." });
    }

    const normalizedType = transactionType.toLowerCase();
    if (!["sell", "buy"].includes(normalizedType)) {
      return res.status(400).json({ message: "Invalid transaction type." });
    }

    const payload = {
      item,
      description: description || "Escrow transaction",
      amount: Number(amount),
      currency,
      transactionType: normalizedType,
      otherPartyEmail: otherPartyEmail || null,
      otherPartyPhone: otherPartyPhone || null,
      setDeliveryDays: Number(setDeliveryDays) || 2,
      deliveryOtp: generateOtp(5).code,
      status: "pending",
    };

    if (normalizedType === "sell") {
      payload.sellerId = req.user.id;
    } else {
      payload.buyerId = req.user.id;
    }

    const transaction = await prisma.transaction.create({ data: payload });
    return res.status(201).json({ data: transaction });
  } catch (error) {
    console.error("Create transaction error:", error);
    return res.status(500).json({ message: "Unable to create transaction." });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: req.params.id },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    if (!isAuthorizedTransaction(transaction, req.user)) {
      return res.status(403).json({ message: "Access denied." });
    }

    return res.json({ data: transaction });
  } catch (error) {
    console.error("Transaction fetch error:", error);
    return res.status(500).json({ message: "Unable to fetch transaction." });
  }
});

router.patch("/:id/deliver", authMiddleware, async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({ where: { id: req.params.id } });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    if (transaction.sellerId && transaction.sellerId !== req.user.id) {
      return res.status(403).json({ message: "Only the seller can mark this transaction as delivered." });
    }

    if (transaction.status === "completed") {
      return res.status(400).json({ message: "Transaction is already completed." });
    }

    const updated = await prisma.transaction.update({
      where: { id: req.params.id },
      data: { status: "delivered" },
    });

    return res.json({ data: updated });
  } catch (error) {
    console.error("Deliver transaction error:", error);
    return res.status(500).json({ message: "Unable to update transaction status." });
  }
});

router.put("/:id/confirmDeliveryIsCompleted", authMiddleware, async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "OTP is required." });
    }

    const transaction = await prisma.transaction.findUnique({ where: { id: req.params.id } });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    if (!isAuthorizedTransaction(transaction, req.user)) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (transaction.status !== "delivered") {
      return res.status(400).json({ message: "Transaction must be marked as delivered before confirming receipt." });
    }

    if (transaction.deliveryOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP code." });
    }

    const updated = await prisma.transaction.update({
      where: { id: req.params.id },
      data: { status: "completed" },
    });

    return res.json({ data: updated, message: "Delivery confirmed and payment released." });
  } catch (error) {
    console.error("Confirm delivery error:", error);
    return res.status(500).json({ message: "Unable to confirm delivery." });
  }
});

export default router;
