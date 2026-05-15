import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import { apiCall } from "../api";
import "../styles/auth.css";

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "failed"
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setStatus("failed");
      setErrorMessage("No payment reference found. The link may be invalid.");
      return;
    }

    const verify = async () => {
      try {
        const res = await apiCall(`/api/payment/verify/${reference}`, "GET");
        const data = res.data;

        // Navigate to escrow page — transactionId lives in Paystack metadata
        // but if not returned we still proceed; user can view via transactions list
        navigate("/payment-escrow", {
          replace: true,
          state: {
            transactionId: data?.transactionId || null,
            amount: data?.amount || null,
            paymentReference: reference,
          },
        });
      } catch (err) {
        setStatus("failed");
        setErrorMessage(err.message || "Payment could not be verified. Please contact support.");
      }
    };

    verify();
  }, [navigate, searchParams]);

  return (
    <div className="auth-page payment-success-page">
      <div className="auth-card" style={{ textAlign: "center", maxWidth: "450px" }}>
        <img src={logoIcon} alt="SecureX" style={{ height: 48, marginBottom: 24 }} />

        {status === "verifying" && (
          <>
            <div className="spinner" style={{ margin: "0 auto 20px" }} />
            <h1 className="auth-heading">Verifying Payment</h1>
            <p className="auth-subtitle">Please wait while we confirm your payment with Paystack...</p>
          </>
        )}

        {status === "failed" && (
          <>
            <div style={{ marginBottom: 20 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#FEE2E2" />
                <circle cx="32" cy="32" r="24" fill="#EF4444" />
                <path d="M22 22L42 42M42 22L22 42" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="auth-heading">Payment Verification Failed</h1>
            <p className="auth-subtitle" style={{ color: "#EF4444" }}>{errorMessage}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              <button
                className="auth-btn"
                onClick={() => navigate("/transactions")}
              >
                View My Transactions
              </button>
              <button
                className="auth-btn"
                style={{ background: "transparent", color: "#6B7280", border: "1px solid #E5E7EB" }}
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;
