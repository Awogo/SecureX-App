import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(600); // 10 minutes
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("OTP:", otp.join(""));
      navigate("/reset-password");
    } catch (err) {
      setError("Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(600);
    console.log("Resend OTP");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
        {/* Title */}
        <h1 className="auth-heading">Verify Your Email</h1>
        <p className="auth-subheading">
          We've sent a 6-digit verification code to your email.<br />
          Please enter it below to complete your registration.
        </p>

        {/* Error */}
        {error && <div className="auth-error">{error}</div>}
    <div  className="auth-card">
        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Verification Code</label>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="otp-box"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading || otp.some(d => !d)}
          >
            {loading ? "Verifying..." : "Verify & Create Account"}
          </button>
        </form>
      </div>
        {/* Resend */}
        <div className="auth-resend">
          <p>
            Didn't receive the code? 
            {timer > 0 ? (
              <span className="timer"> Resend in {formatTime(timer)}</span>
            ) : (
              <button onClick={handleResend} className="resend-btn"> Resend</button>
            )}
          </p>
          <a href="/signup" className="link-text">← Back to Registration</a>
        </div>

        {/* Timer Warning */}
        <div className="otp-warning">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#4A5CF5" strokeWidth="1.5"/>
            <path d="M7 3.5V7L9 9" stroke="#4A5CF5" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>OTP expires in {formatTime(timer)}</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;