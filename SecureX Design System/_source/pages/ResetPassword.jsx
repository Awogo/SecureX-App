import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state. If missing, redirect back.
  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      // If someone tries to access this page directly without email, send them back
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [validations, setValidations] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // OTP Handlers
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");

    if (name === "password") {
      setValidations({
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*]/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://100.53.84.123/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          otp: otp.join(""), // Combine OTP array into string
          newPassword: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successful! Please login.");
        navigate("/login");
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const allValid = Object.values(validations).every(v => v) && 
                   formData.password === formData.confirmPassword &&
                   otp.every(d => d); // Also check if OTP is filled

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

        <h1 className="auth-heading">Reset Password</h1>
        <p className="auth-subheading">Enter the code sent to <strong>{email}</strong> and your new password.</p>

        {error && <div className="auth-error">{error}</div>}
        
        <div className="auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
            
            {/* OTP Section */}
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
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={loading}
                  />
                ))}
              </div>
            </div>

            {/* Password Section */}
            <div className="form-group">
              <label>New Password</label>
              <div className="input-container">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="input-icon">
                  <rect x="3" y="7.5" width="12" height="8.25" rx="1.5" stroke="#7A7A7A" strokeWidth="1.5"/>
                  <path d="M6 7.5V5.25C6 3.59315 7.34315 2.25 9 2.25C10.6569 2.25 12 3.59315 12 5.25V7.5" stroke="#7A7A7A" strokeWidth="1.5"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z" stroke="#7A7A7A" strokeWidth="1.5"/>
                    <circle cx="9" cy="9" r="2.25" stroke="#7A7A7A" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-container">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="input-icon">
                  <rect x="3" y="7.5" width="12" height="8.25" rx="1.5" stroke="#7A7A7A" strokeWidth="1.5"/>
                  <path d="M6 7.5V5.25C6 3.59315 7.34315 2.25 9 2.25C10.6569 2.25 12 3.59315 12 5.25V7.5" stroke="#7A7A7A" strokeWidth="1.5"/>
                </svg>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z" stroke="#7A7A7A" strokeWidth="1.5"/>
                    <circle cx="9" cy="9" r="2.25" stroke="#7A7A7A" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="password-requirements">
              <p className="req-item">Password Requirements:</p>
              <div className="req-list">
                <div className={`req-item ${validations.minLength ? "valid" : ""}`}>
                  {validations.minLength ? "✓" : "○"} Minimum 8 characters
                </div>
                <div className={`req-item ${validations.uppercase ? "valid" : ""}`}>
                  {validations.uppercase ? "✓" : "○"} At least 1 uppercase letter
                </div>
                <div className={`req-item ${validations.number ? "valid" : ""}`}>
                  {validations.number ? "✓" : "○"} At least 1 number
                </div>
                <div className={`req-item ${validations.special ? "valid" : ""}`}>
                  {validations.special ? "✓" : "○"} At least 1 special character
                </div>
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={loading || !allValid}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>

        <div className="auth-secure">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L2 3V6.5C2 9.5 4.5 12 7 13C9.5 12 12 9.5 12 6.5V3L7 1Z" fill="#00D9A3"/>
          </svg>
          Secure password encryption
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;