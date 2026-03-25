import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a small delay for verification
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="auth-page payment-success-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page payment-success-page">
      {/* Logo */}
      <div className="logo-container">
        <div className="auth-logo-section">
          <div className="logo">
            <div className="logo-wrapper">
              <img src={logoIcon} alt="SecureX Icon" className="logo-icon" />
            </div>
            <div className="auth-brand">
              <h2>SecureX</h2>
              <p>Safe payment for Africa SMEs</p>
            </div>
          </div>
        </div>
      </div>
 
      <div className="auth-card">
        {/* Success Icon */}
        <div className="centered-container">
          <div className="success-icon-circle">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1"/>
              <circle cx="32" cy="32" r="24" fill="#10B981"/>
              <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Success Message */}
        <h1 className="auth-heading">Payment Successful</h1>
        <p className="auth-subheading">
          Your funds have been securely held in Escrow. You will be notified once the seller delivers the item.
        </p>

        {/* Go to Dashboard Button */}
        <button className="auth-button" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>

      {/* Security Badge */}
      <div className="auth-secure">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L3 3V7C3 10.5 5.5 13.5 8 15C10.5 13.5 13 10.5 13 7V3L8 1Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 8L7.5 9.5L10 6.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Secured by SecureX Escrow</span>
      </div>
      
      {/* LOCAL STYLES TO FIX LAYOUT */}
      <style>{`
        .payment-success-page {
          display: flex;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 100vh;
          padding: 40px 20px;
          background-color: #F6F7FB;
        }
        
        .payment-success-page .logo-container {
          margin-bottom: 30px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .payment-success-page .auth-card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }

        .payment-success-page .auth-secure {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10B981;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;