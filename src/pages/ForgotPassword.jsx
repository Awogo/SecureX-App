import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const BackToLogin = () => (
  <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A7A7A', textDecoration: 'none' }}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 3H15C15.825 3 16.5 3.675 16.5 4.5V13.5C16.5 14.325 15.825 15 15 15H3C2.175 15 1.5 14.325 1.5 13.5V4.5C1.5 3.675 2.175 3 3 3Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16.5 4.5L9 9.75L1.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    Back to Login
  </Link>
);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    navigate("/verify-email");
  };

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

        <h1 className="auth-heading">Forgot Password?</h1>
        <p className="auth-subheading">Enter your email to receive a verification code</p>
        <div className="auth-card" >
        <form onSubmit={handleSubmit} className="auth-form">
         <div className="form-group">
            
          <input className="input-container"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
              />
          </div>
        <button type="submit" className="auth-button"> Send OTP
              </button>
</form>
</div>
<BackToLogin />

      </div>
    </div>
  );
};

export default ForgotPassword;