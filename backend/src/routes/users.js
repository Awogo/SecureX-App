import express from "express";
import prisma from "../prismaClient.js";
import { calculateTrustScore, sanitizeUser } from "../utils/helpers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const completedCount = await prisma.transaction.count({
      where: {
        status: "completed",
        OR: [{ buyerId: req.user.id }, { sellerId: req.user.id }],
      },
    });

    const trustScore = calculateTrustScore(user, completedCount);
    if (trustScore !== user.trustScore) {
      await prisma.user.update({ where: { id: user.id }, data: { trustScore } });
      user.trustScore = trustScore;
    }

    return res.json({ data: sanitizeUser(user) });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: "Unable to fetch profile." });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const allowedFields = ["firstName", "lastName", "phone", "bankName", "accountNumber", "accountName"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid profile fields provided." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    return res.json({ data: sanitizeUser(updatedUser) });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Unable to update profile." });
  }
});

export default router;
