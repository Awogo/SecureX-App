import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { env } from 'process';

const router = express.Router();

const getPaystackKey = () =>
  (env.PAYSTACK_SECRET_KEY || "").trim().replace(/^["']|["']$/g, "");

// Initialize a Paystack payment for a transaction
router.post("/initialize", authMiddleware, async (req, res) => {
  try {
    const { amount, transactionId } = req.body;
    const email = req.user.email;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "A valid amount is required." });
    }

    const secretKey = getPaystackKey();
    if (!secretKey) {
      return res.status(500).json({ message: "Payment service is not configured." });
    }

    console.log("[Paystack] key preview:", secretKey.slice(0, 12) + "... | length:", secretKey.length);

    const callbackUrl = `${(env.FRONTEND_URL || "http://localhost:5173")}/payment-callback`;

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(Number(amount) * 100),
        callback_url: callbackUrl,
        metadata: {
          transactionId: transactionId || null,
          custom_fields: [
            {
              display_name: "Transaction ID",
              variable_name: "transaction_id",
              value: transactionId || "",
            },
          ],
        },
      }),
    });

    const paystackData = await paystackResponse.json();
    console.log("[Paystack] init response:", JSON.stringify(paystackData));

    if (!paystackData.status) {
      return res.status(400).json({ message: paystackData.message || "Failed to initialize payment." });
    }

    return res.json({
      data: {
        url: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
        accessCode: paystackData.data.access_code,
        transactionId: transactionId || null,
      },
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return res.status(500).json({ message: "Unable to initialize payment." });
  }
});

// Verify a completed Paystack payment
router.get("/verify/:reference", authMiddleware, async (req, res) => {
  try {
    const { reference } = req.params;

    const secretKey = getPaystackKey();
    if (!secretKey) {
      return res.status(500).json({ message: "Payment service is not configured." });
    }

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status || paystackData.data?.status !== "success") {
      return res.status(400).json({ message: "Payment verification failed or payment not yet successful." });
    }

    return res.json({
      data: {
        reference: paystackData.data.reference,
        amount: paystackData.data.amount / 100,
        status: paystackData.data.status,
        paidAt: paystackData.data.paid_at,
        customerEmail: paystackData.data.customer?.email,
      },
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ message: "Unable to verify payment." });
  }
});

export default router;
