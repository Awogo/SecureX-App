import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import { apiCall } from "../api";
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setError("");

    try {
      const data = await apiCall("/api/auth/login", "POST", formData);
      const response = data;
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
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
      padding: 'var(--space-4)',
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
              Welcome back
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              color: 'var(--ink-500)',
              margin: 0
            }}>
              Sign in to continue securing your transactions.
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
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Enter your password"
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
              <div style={{ marginTop: 'var(--space-2)', textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--indigo-600)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              style={{ width: '100%', marginTop: 'var(--space-2)' }}
            >
              {loading ? "Signing in..." : "Sign in"}
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
              New to SecureX?{" "}
              <button
                onClick={() => navigate("/signup")}
                style={{
                  color: 'var(--indigo-600)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'var(--w-semibold)',
                  padding: 0
                }}
              >
                Create an account
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;