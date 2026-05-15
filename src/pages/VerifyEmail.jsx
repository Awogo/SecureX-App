import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";
import { apiCall } from "../api"; // Import helper

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [timer, setTimer] = useState(120); 
  
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
    setSuccessMsg(""); // Clear success msg when typing

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
    setError("");

    try {
      const data = await apiCall("/api/auth/verify-email", "POST", {
        email: email,
        otp: otp.join("")
      });

      // SUCCESS
      localStorage.setItem("token", data.token);
      navigate("/dashboard");

    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return; 
    
    setResending(true);
    setError(""); 
    
    try {
      await apiCall("/api/auth/resend-otp", "POST", { email });
      setTimer(120); // timer 2 mins
      setSuccessMsg("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    // formats as 2:00 or 1:05 correctly
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

        {/* Error & Success Messages */}
        {error && <div className="auth-error">{error}</div>}
        {successMsg && <div className="auth-success" style={{ background: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '4px', marginBottom: '10px', textAlign: 'center' }}>{successMsg}</div>}

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
              <button onClick={handleResend} className="resend-btn" disabled={resending}>
                {resending ? "Sending..." : " Resend"}
              </button>
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