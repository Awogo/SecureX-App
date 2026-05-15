import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/transaction.css";
import { apiCall } from "../api";

const DeliveryCodeBuyer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  
  // Get transactionId from navigation state
  const transactionId = location.state?.transactionId;

  // Helper: Initials
  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  // Fetch User Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profileData = await apiCall("/api/users/profile", "GET");
        const rawUser = profileData.data || profileData.user || profileData;
        let firstName = rawUser.firstName;
        let lastName = rawUser.lastName;
        if (!firstName && rawUser.name) {
          const parts = rawUser.name.split(" ");
          firstName = parts[0];
          lastName = parts.slice(1).join(" ");
        }
        setUserData({ firstName, lastName, email: rawUser.email });
      } catch (err) {
        console.error("Not logged in");
      }
    };
    fetchUser();
  }, []);

  // Input Handlers
  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 4) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  // --- API: Confirm Delivery ---
  // Inside DeliveryCodeBuyer.jsx

  const handleVerify = async () => {
    const enteredCode = code.join("");
    
    setLoading(true);
    try {
      // PAYLOAD: Matches Swagger { "otp": "..." }
      const payload = { otp: enteredCode };

      await apiCall(`/api/transactions/${transactionId}/confirmDeliveryIsCompleted`, "PUT", payload);

      alert("Delivery confirmed! Payment released to seller.");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };


  const handleScanClick = () => {
    alert("Camera scanning requires installing a library. Please enter the code manually.");
  };

  return (
    <div className="transaction-page">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="transaction-main">
        <header className="transaction-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Proof of Delivery</span>
          </button>

          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C10 4 6 7 6 10C6 12 7.34315 13 9 13H11C12.6569 13 14 12 14 10C14 7 10 4 10 4Z" stroke="#1E1E1E" strokeWidth="1.5"/><path d="M9 16H11" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span className="notification-badge">1</span>
            </button>
            <button className="user-btn">
              <div className="user-avatar-small">{getInitials(userData)}</div>
            </button>
          </div>
        </header>

        {/* View Toggle */}
        <div className="view-toggle">
          <button className="toggle-btn" onClick={() => navigate("/delivery-code-seller")}>Sellers View</button>
          <button className="toggle-btn active">Buyers View</button>
        </div>

        {/* Content */}
        <div className="delivery-content">
          <div className="delivery-card">
            {/* Icon */}
            <div className="delivery-icon blue">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="12" y="18" width="24" height="20" rx="3" stroke="#4A5CF5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 18V14C16 10.4 18.4 8 22 8C25.6 8 28 10.4 28 14V18" stroke="#4A5CF5" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>

            <h1 className="delivery-title">Confirm Delivery</h1>
            <p className="delivery-subtitle">
              Enter the code from the seller to confirm receipt and release payment
            </p>

            {/* Code Input */}
            <div className="code-input-section">
              <p className="code-label">Enter 5-digit Code</p>
              <div className="code-inputs">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="code-input"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button className="btn-verify" onClick={handleVerify} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Release Payment"}
            </button>
            

            {/* Important Notice */}
            <div className="important-notice">
              <div className="notice-icon">⚠️</div>
              <div className="notice-text">
                <strong>Important</strong>
                <p>Only confirm delivery once you have physically received and inspected the product. Payment will be immediately released to the seller.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryCodeBuyer;