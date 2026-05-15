import express from "express";
import prisma from "../prismaClient.js";
import {
  createToken,
  generateOtp,
  hashPassword,
  comparePassword,
  sendEmail,
  calculateTrustScore,
  sanitizeUser,
} from "../utils/helpers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  registerLimiter,
  authLimiter,
  otpLimiter,
  passwordResetLimiter,
} from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/register", registerLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required registration fields." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const hashedPassword = await hashPassword(password);
    const { code, expiresAt } = generateOtp(6);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        emailVerificationCode: code,
        emailVerificationCodeExpires: expiresAt,
      },
    });

    const emailSent = await sendEmail(
      email,
      "SecureX Email Verification",
      `Your SecureX verification code is ${code}. It expires in 10 minutes.`
    );

    return res.status(201).json({
      message: "Registration successful. Verify your email to complete setup.",
      emailSent,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Unable to complete registration." });
  }
});

router.post("/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    const token = createToken(user);
    const sanitized = sanitizeUser(user);
    return res.json({ token, user: sanitized });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed." });
  }
});

router.post("/verify-email", otpLimiter, async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.emailVerificationCode !== otp) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    // Check if OTP has expired
    if (user.emailVerificationCodeExpires && new Date(user.emailVerificationCodeExpires) < new Date()) {
      return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
    }

    const updated = await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
        emailVerificationCode: null,
        emailVerificationCodeExpires: null,
      },
    });

    const token = createToken(updated);
    const sanitized = sanitizeUser(updated);
    return res.json({ token, user: sanitized });
  } catch (error) {
    console.error("Verify email error:", error);
    return res.status(500).json({ message: "Email verification failed." });
  }
});

router.post("/resend-otp", otpLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { code, expiresAt } = generateOtp(6);
    await prisma.user.update({
      where: { email },
      data: {
        emailVerificationCode: code,
        emailVerificationCodeExpires: expiresAt,
      },
    });

    const emailSent = await sendEmail(
      email,
      "SecureX Verification Code",
      `Your new verification code is ${code}. It expires in 10 minutes.`
    );

    return res.json({ message: "A new verification code has been sent.", emailSent });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({ message: "Could not resend OTP." });
  }
});

router.post("/forgot-password", passwordResetLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: "If the email exists, a reset code has been sent." });
    }

    const { code, expiresAt } = generateOtp(6);

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetCode: code,
        passwordResetExpires: expiresAt,
      },
    });

    const emailSent = await sendEmail(
      email,
      "SecureX Password Reset",
      `Your password reset code is ${code}. It expires in 10 minutes.`
    );

    return res.json({ message: "Password reset code sent to your email.", emailSent });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Unable to send password reset code." });
  }
});

router.post("/reset-password", otpLimiter, async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.passwordResetCode !== otp) {
      return res.status(400).json({ message: "Invalid reset code." });
    }

    if (!user.passwordResetExpires || new Date(user.passwordResetExpires) < new Date()) {
      return res.status(400).json({ message: "Reset code has expired." });
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { email },
      data: {
        password: passwordHash,
        passwordResetCode: null,
        passwordResetExpires: null,
      },
    });

    return res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Password reset failed." });
  }
});

router.post("/update-kyc", authMiddleware, async (req, res) => {
  try {
    const allowedFields = [
      "idType",
      "idNumber",
      "bankName",
      "accountNumber",
      "accountName",
      "governmentId",
      "businessName",
      "registrationNumber",
    ];

    const updateData = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid verification fields provided." });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    const completedCount = await prisma.transaction.count({
      where: {
        status: "completed",
        OR: [{ buyerId: req.user.id }, { sellerId: req.user.id }],
      },
    });

    const trustScore = calculateTrustScore(updated, completedCount);
    if (trustScore !== updated.trustScore) {
      await prisma.user.update({
        where: { id: req.user.id },
        data: { trustScore },
      });
    }

    return res.json({ message: "Verification data updated.", data: sanitizeUser(updated) });
  } catch (error) {
    console.error("Update KYC error:", error);
    return res.status(500).json({ message: "Unable to update verification information." });
  }
});

export default router;
