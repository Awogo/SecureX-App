import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. Try to get ID from URL (Paystack callback)
    let ref = searchParams.get("ref") || searchParams.get("reference");
    let amount = null;
    let item = null;

    // 2. If no URL ID, try to get from Navigation State (Direct from CreateTransaction)
    if (!ref && location.state?.transactionId) {
      ref = location.state.transactionId;
      amount = location.state.amount;
      item = location.state.item;
    }

    console.log("Transaction ID:", ref);

    const timer = setTimeout(() => {
      if (ref) {
        // Navigate to Escrow, passing all details forward
        navigate("/payment-escrow", { 
          state: { 
            transactionId: ref,
            amount: amount,
            item: item
          } 
        });
      } else {
        console.error("No Transaction ID found");
        navigate("/dashboard");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams, location.state]);

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
        
        <h1 className="auth-heading">Success!</h1>
        <p className="auth-subtitle">
          Redirecting to your transaction details...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;