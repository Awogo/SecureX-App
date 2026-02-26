import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password validation
  const [validations, setValidations] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");

    // Validate password requirements
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
      // TODO: Call backend API
      console.log("Reset password");
      navigate("/password-success");
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const allValid = Object.values(validations).every(v => v) && 
                   formData.password === formData.confirmPassword;

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
        <h1 className="auth-heading">Reset Password</h1>
        <p className="auth-subheading">Create a new secure password</p>

        {/* Error */}
        {error && <div className="error-alert">{error}</div>}
    <div className="auth-card">
        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
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
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z" stroke="#7A7A7A" strokeWidth="1.5"/>
                  <circle cx="9" cy="9" r="2.25" stroke="#7A7A7A" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Password Requirements */}
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

          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading || !allValid}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
</div>
        {/* Security Notice */}
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