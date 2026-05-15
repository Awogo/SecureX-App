import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const generateOtp = (length = 6) => {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i += 1) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  // Return OTP and expiration timestamp (10 minutes from now)
  return {
    code,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  };
};

export const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const createToken = (user) => {
  const secret = process.env.JWT_SECRET || "securex_secret";
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: "7d" }
  );
};

export const calculateTrustScore = (user, completedTransactions = 0) => {
  let score = 50;
  if (user.emailVerified) score += 15;
  if (user.idNumber) score += 10;
  if (user.accountNumber) score += 10;
  if (user.governmentId) score += 10;
  score += Math.min(15, completedTransactions * 5);
  return Math.min(100, Math.max(0, score));
};

export const sanitizeUser = (user) => {
  const {
    password,
    emailVerificationCode,
    emailVerificationCodeExpires,
    passwordResetCode,
    passwordResetExpires,
    ...safeUser
  } = user;
  return safeUser;
};

export const sendEmail = async (recipient, subject, body) => {
  try {
    // If no Resend API key, log to console for development
    if (!resend) {
      console.log(`\n[EMAIL - DEVELOPMENT MODE]\nTo: ${recipient}\nSubject: ${subject}\nBody: ${body}\n`);
      return true;
    }

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: recipient,
      subject,
      html: `<p>${body}</p>`,
    });

    if (response.error) {
      console.error("Resend email error:", response.error);
      return false;
    }

    console.log(`Email sent successfully to ${recipient}`);
    return true;
  } catch (error) {
    console.error("SendEmail error:", error);
    return false;
  }
};
