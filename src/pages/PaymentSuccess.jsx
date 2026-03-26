import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. Try to get ID from URL (standard flow)
    let ref = searchParams.get("ref") || searchParams.get("reference");
    
    // 2. If no ID in URL, try Local Storage (fallback)
    if (!ref) {
      ref = localStorage.getItem("lastTransactionId");
    }

    console.log("Payment Success Ref:", ref);

    const timer = setTimeout(() => {
      if (ref) {
        // Navigate to Escrow Page
        navigate("/payment-escrow", { state: { transactionId: ref } });
      } else {
        // Absolute fallback
        console.error("No Transaction ID found. Going to dashboard.");
        navigate("/dashboard");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams]);

  return (
    <div className="auth-page payment-success-page">
      <div className="auth-card" style={{ textAlign: 'center', maxWidth: '450px' }}>
        <div className="centered-container">
          <div className="success-icon-circle">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1"/>
              <circle cx="32" cy="32" r="24" fill="#10B981"/>
              <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <h1 className="auth-heading">Payment Successful</h1>
        <p className="auth-subtitle">
          Redirecting to your transaction details...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;