import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import { apiCall } from "../api";
import { ShieldCheckIcon, EyeIcon, EyeSlashIcon, CheckIcon } from "@heroicons/react/24/outline";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: location.state?.email ?? "",
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
      const { confirmPassword, ...dataToSend } = formData;
      await apiCall("/api/auth/register", "POST", dataToSend);
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--bg-canvas) 0%, var(--indigo-50) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8) var(--space-4)',
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        {/* Auth Card */}
        <Card padding="lg" style={{
          boxShadow: '0 16px 48px rgba(15,18,48,0.10), 0 2px 8px rgba(15,18,48,0.04)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border-100)',
        }}>
          {/* Logo and Brand */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div style={{
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, var(--navy-600) 0%, var(--indigo-600) 100%)',
              borderRadius: 'var(--radius-2xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-3)',
              boxShadow: 'var(--shadow-primary)',
            }}>
              <ShieldCheckIcon style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--w-bold)',
              fontSize: 'var(--text-xl)',
              color: 'var(--ink-800)',
              marginBottom: 2,
            }}>SecureX</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-400)' }}>
              Smart escrow for African SMEs
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--w-bold)',
              fontSize: 'var(--text-3xl)',
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--ink-900)',
              margin: '0 0 var(--space-2) 0'
            }}>
              Create your account
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              color: 'var(--ink-500)',
              margin: 0
            }}>
              Join thousands securing their transactions
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'var(--danger-100)',
              border: '1px solid var(--danger-400)',
              color: 'var(--danger-500)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-6)',
              fontSize: 'var(--text-sm)'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Name Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ minWidth: 0 }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--w-medium)',
                  color: 'var(--ink-700)',
                  marginBottom: 'var(--space-2)'
                }}>
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Polani"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ minWidth: 0 }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--w-medium)',
                  color: 'var(--ink-700)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Adani"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--w-medium)',
                color: 'var(--ink-700)',
                marginBottom: 'var(--space-2)'
              }}>
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="polaniadan@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--w-medium)',
                color: 'var(--ink-700)',
                marginBottom: 'var(--space-2)'
              }}>
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? (
                      <EyeSlashIcon style={{ width: '20px', height: '20px', color: 'var(--ink-600)' }} />
                    ) : (
                      <EyeIcon style={{ width: '20px', height: '20px', color: 'var(--ink-600)' }} />
                    )}
                  </button>
                }
              />

              {/* Password Requirements */}
              {formData.password && (
                <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)',
                    color: validations.minLength ? 'var(--success-600)' : 'var(--ink-500)'
                  }}>
                    <CheckIcon style={{
                      width: '16px',
                      height: '16px',
                      color: validations.minLength ? 'var(--success-500)' : 'var(--ink-400)'
                    }} />
                    <span>Minimum 8 characters</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)',
                    color: validations.uppercase ? 'var(--success-600)' : 'var(--ink-500)'
                  }}>
                    <CheckIcon style={{
                      width: '16px',
                      height: '16px',
                      color: validations.uppercase ? 'var(--success-500)' : 'var(--ink-400)'
                    }} />
                    <span>At least 1 uppercase letter</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)',
                    color: validations.number ? 'var(--success-600)' : 'var(--ink-500)'
                  }}>
                    <CheckIcon style={{
                      width: '16px',
                      height: '16px',
                      color: validations.number ? 'var(--success-500)' : 'var(--ink-400)'
                    }} />
                    <span>At least 1 number</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)',
                    color: validations.special ? 'var(--success-600)' : 'var(--ink-500)'
                  }}>
                    <CheckIcon style={{
                      width: '16px',
                      height: '16px',
                      color: validations.special ? 'var(--success-500)' : 'var(--ink-400)'
                    }} />
                    <span>At least 1 special character</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--w-medium)',
                color: 'var(--ink-700)',
                marginBottom: 'var(--space-2)'
              }}>
                Confirm Password
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon style={{ width: '20px', height: '20px', color: 'var(--ink-600)' }} />
                    ) : (
                      <EyeIcon style={{ width: '20px', height: '20px', color: 'var(--ink-600)' }} />
                    )}
                  </button>
                }
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              style={{ width: '100%', marginTop: 'var(--space-2)' }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Security badge — inside the form */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3)',
              background: 'rgba(0,217,163,0.08)',
              borderRadius: 'var(--radius-md)',
              color: '#047857',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--w-medium)',
              marginTop: 'var(--space-2)',
            }}>
              <ShieldCheckIcon style={{ width: '14px', height: '14px', flexShrink: 0 }} />
              Bank-level encryption · Your data is protected
            </div>
          </form>

          {/* Footer */}
          <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
            <p style={{
              color: 'var(--ink-500)',
              fontSize: 'var(--text-sm)',
              margin: 0
            }}>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                style={{
                  color: 'var(--indigo-600)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'var(--w-semibold)',
                  padding: 0
                }}
              >
                Sign in
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;