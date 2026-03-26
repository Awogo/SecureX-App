import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/payment.css";
import { apiCall } from "../api";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  const { transactionId, amount, item, email } = location.state || {};

  useEffect(() => {
    if (!transactionId) {
      alert("No transaction found. Please start again.");
      navigate("/create-transaction");
    }
  }, [transactionId, navigate]);

 const handlePayment = async () => {
  setLoading(true);

    try {
    const payload = {
      meta: { amount: Number(amount), email },
      redirect_url: `${window.location.origin}/payment-success?ref=${transactionId}`,
      payment_merchant: "Paystack",
      payment_title: item || "Escrow Payment",
      payment_for: "transaction"
    };

    const res = await apiCall("/api/payment/get-link", "POST", payload);

    console.log("FULL RESPONSE:", res);

    // ✅ HANDLE ALL POSSIBLE RESPONSE SHAPES
    const authUrl =
      res?.authorization_url ||
      res?.data?.authorization_url ||
      res?.data?.data?.authorization_url;

    if (authUrl) {
      window.location.href = authUrl;
    } else {
      console.error("NO AUTH URL FOUND:", res);
      alert("Payment link not found. Check backend response.");
    }

  } catch (err) {
    console.error("PAYMENT ERROR:", err);
    alert(err.message || "Payment failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="payment-gateway-page">
      <div className="gateway-container">

        <div className="gateway-logo">
          <img src={logoBlue} alt="SecureX" />
        </div>

        <h1>Secure Payment</h1>
        <p className="gateway-subtitle">Your funds are protected by Escrow</p>

        <div className="gateway-summary">
          <div className="summary-row">
            <span>Item</span>
            <strong>{item}</strong>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <strong>₦{Number(amount).toLocaleString()}</strong>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>

          {/* CARD METHOD */}
          <div
            className={`method-card ${method === "card" ? "selected" : ""}`}
            onClick={() => setMethod("card")}
          >
            <div className="method-icon">
              {/* 🔥 CLEAN SVG ICON */}
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                <rect x="1" y="3" width="26" height="14" rx="3" stroke="#4A5CF5" strokeWidth="1.5"/>
                <rect x="1" y="7" width="26" height="3" fill="#4A5CF5"/>
                <circle cx="6" cy="14" r="1" fill="#4A5CF5"/>
                <circle cx="10" cy="14" r="1" fill="#4A5CF5"/>
              </svg>
            </div>

            <div className="method-info">
              <h4>Debit/Credit Card</h4>
              <p>Pay securely with Mastercard, Visa, Verve</p>
            </div>

            <div className="method-check">
              {method === "card" && "✓"}
            </div>
          </div>

          {/* TRANSFER METHOD */}
          <div
            className={`method-card ${method === "transfer" ? "selected" : ""}`}
            onClick={() => setMethod("transfer")}
          >
            <div className="method-icon">
              <svg width="28" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 10L12 4L21 10" stroke="#4A5CF5" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="5" y="10" width="14" height="8" rx="2" stroke="#4A5CF5" strokeWidth="1.5"/>
                <path d="M8 14H16" stroke="#4A5CF5" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="method-info">
              <h4>Bank Transfer</h4>
              <p>Direct transfer via Paystack</p>
            </div>

            <div className="method-check">
              {method === "transfer" && "✓"}
            </div>
          </div>
        </div>

        <button
          className="gateway-pay-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `Pay ₦${Number(amount).toLocaleString()}`
          }
        </button>

        <div className="gateway-secure">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1L3 3V7C3 10.5 5.5 13.5 8 15C10.5 13.5 13 10.5 13 7V3L8 1Z"
              stroke="#10B981"
              strokeWidth="1.5"
            />
          </svg>
          <span>Secured by Paystack</span>
        </div>

      </div>
    </div>
  );
};

export default PaymentGateway;