import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png"
import "../styles/auth.css";

const PasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
          {/* Logo */}
    <div>
    <div className="auth-logo-section">
     <div className="logo">
      <div className="logo-wrapper">
        <img src={logoIcon} alt="SecureX Icon" className="logo-icon" />
      </div>
        <div className="auth-brand">
        <h2>SecureX</h2><p>Safe payment for Africa SMEs</p>
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
        <h1 className="auth-heading">Password Successfully Updated</h1>
        <p className="auth-subheading">
          Your password has been reset successfully. You can now sign in with your new password.
        </p>

        {/* Go to Login Button */}
        <button 
          className="auth-button" 
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
</div>
        {/* Security Badge */}
        <div className="auth-secure">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L3 3V7C3 10.5 5.5 13.5 8 15C10.5 13.5 13 10.5 13 7V3L8 1Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 8L7.5 9.5L10 6.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Your account is secure</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordSuccess;