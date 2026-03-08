import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(600); // 10 minutes
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      console.warn("No email found, redirection recommended.");
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [email]);

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
    
    if (!email) {
        setError("Email is missing. Please go back and sign up again.");
        return;
    }

    setLoading(true);
    setError("");

    try {
      const otpCode = otp.join("");

      const response = await fetch("http://100.53.84.123/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otpCode
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS (Code 200)
        // Backend returns JWT, meaning the user is now logged in.
        
        // 1. Save the token
        localStorage.setItem("token", data.token);
        
        // 2. Go to dashboard
        navigate("/dashboard");
      } else {
        // FAILURE (Code 400)
        setError(data.message || "Invalid verification code");
      }

    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(600);
    console.log("Resend OTP for:", email);
    // NOTE: You will need a "Resend OTP" API endpoint from your backend dev to implement this fully.
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
          We've sent a 6-digit verification code to <strong>{email}</strong><br />
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