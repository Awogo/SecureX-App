import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const BackToLogin = () => (
  <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A7A7A', textDecoration: 'none', marginTop: '20px' }}>
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://100.53.84.123/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP sent successfully!");
        // Navigate to reset password page and pass the email state
        setTimeout(() => {
          navigate("/reset-password", { state: { email: email } });
        }, 1000);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
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
        
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success" style={{ background: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '5px', marginBottom: '10px', textAlign: 'center' }}>{success}</div>}

        <div className="auth-card">


<form onSubmit={handleSubmit} className="auth-form">
  <div className="form-group">
    <label>Email Address</label>
    {/* 1. Add the wrapper div with className="input-container" */}
    <div className="input-container">
      {/* 2. Add the same Mail Icon used in Login */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="input-icon">
        <path d="M3 3H15C15.825 3 16.5 3.675 16.5 4.5V13.5C16.5 14.325 15.825 15 15 15H3C2.175 15 1.5 14.325 1.5 13.5V4.5C1.5 3.675 2.175 3 3 3Z" stroke="#7A7A7A" strokeWidth="1.5"/>
        <path d="M16.5 4.5L9 9.75L1.5 4.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      {/* 3. Input has no class, just the props */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
  </div>

  <button type="submit" className="auth-button" disabled={loading}>
    {loading ? "Sending..." : "Send OTP"}
  </button>
</form>
        </div>
        <BackToLogin />
      </div>
    </div>
  );
};

export default ForgotPassword;