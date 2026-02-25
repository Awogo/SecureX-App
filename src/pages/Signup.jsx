import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
    try {
      console.log("Signup:", formData);
      navigate("/verify-email");
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
       <div className="auth-logo-section">
  <div className="logo-wrapper">
    <img src={logoIcon} alt="SecureX Icon" className="logo-icon" />
  </div>
  <div className="auth-brand">
    <h2>SecureX</h2>
    <p>Safe payment for Africa SMEs</p>
  </div>
</div>
        {/* Title */}
        <h1 className="auth-heading">Create Your Account</h1>
        <p className="auth-subheading">Join thousands securing their transactions</p>

        {/* Error */}
        {error && <div className="auth-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <div className="input-container">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="input-icon">
                  <circle cx="9" cy="5.25" r="2.25" stroke="#7A7A7A" strokeWidth="1.5"/>
                  <path d="M4.5 13.5C4.5 11.8431 5.84315 10.5 7.5 10.5H10.5C12.1569 10.5 13.5 11.8431 13.5 13.5V15H4.5V13.5Z" stroke="#7A7A7A" strokeWidth="1.5"/>
                </svg>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Polani"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <div className="input-container">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="input-icon">
                  <circle cx="9" cy="5.25" r="2.25" stroke="#7A7A7A" strokeWidth="1.5"/>
                  <path d="M4.5 13.5C4.5 11.8431 5.84315 10.5 7.5 10.5H10.5C12.1569 10.5 13.5 11.8431 13.5 13.5V15H4.5V13.5Z" stroke="#7A7A7A" strokeWidth="1.5"/>
                </svg>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Adani"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="input-icon">
                <path d="M3 3H15C15.825 3 16.5 3.675 16.5 4.5V13.5C16.5 14.325 15.825 15 15 15H3C2.175 15 1.5 14.325 1.5 13.5V4.5C1.5 3.675 2.175 3 3 3Z" stroke="#7A7A7A" strokeWidth="1.5"/>
                <path d="M16.5 4.5L9 9.75L1.5 4.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="email"
                name="email"
                placeholder="polaniadan@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="input-icon">
                <rect x="3" y="7.5" width="12" height="8.25" rx="1.5" stroke="#7A7A7A" strokeWidth="1.5"/>
                <path d="M6 7.5V5.25C6 3.59315 7.34315 2.25 9 2.25C10.6569 2.25 12 3.59315 12 5.25V7.5" stroke="#7A7A7A" strokeWidth="1.5"/>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
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

            {/* Password Requirements */}
            {formData.password && (
              <div className="password-requirements">
                <div className={`req-item ${validations.minLength ? "valid" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    {validations.minLength && <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
                  </svg>
                  <span>Minimum 8 characters</span>
                </div>
                <div className={`req-item ${validations.uppercase ? "valid" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    {validations.uppercase && <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
                  </svg>
                  <span>At least 1 uppercase letter</span>
                </div>
                <div className={`req-item ${validations.number ? "valid" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    {validations.number && <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
                  </svg>
                  <span>At least 1 number</span>
                </div>
                <div className={`req-item ${validations.special ? "valid" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    {validations.special && <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
                  </svg>
                  <span>At least 1 special character</span>
                </div>
              </div>
            )}
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
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
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

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;