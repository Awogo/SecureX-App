import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Login:", formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
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
        <h1 className="auth-heading">Welcome Back</h1>
        <p className="auth-subheading">Sign in to access your account</p>

        {/* Error */}
        {error && <div className="auth-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z" stroke="#7A7A7A" strokeWidth="1.5"/>
                    <circle cx="9" cy="9" r="2.25" stroke="#7A7A7A" strokeWidth="1.5"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2.25 2.25L15.75 15.75M7.5 7.5C7.03587 7.96413 6.75 8.60218 6.75 9.3C6.75 10.7912 7.9588 12 9.45 12C10.1478 12 10.7859 11.7141 11.25 11.25" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="form-footer">
              <a href="/forgot-password" className="link-text">Forgot Password?</a>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>

        <div className="auth-secure">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L2 3V6.5C2 9.5 4.5 12 7 13C9.5 12 12 9.5 12 6.5V3L7 1Z" fill="#00D9A3"/>
          </svg>
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Login;