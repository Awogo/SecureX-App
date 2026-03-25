import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";
import { apiCall } from "../api";

const DeliveryCodeBuyer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("buyer");
  
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
  const handleVerify = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 5) {
      alert("Please enter the complete 5-digit code");
      return;
    }
    
    if(!transactionId) {
      alert("Error: Transaction ID is missing.");
      return;
    }

    setLoading(true);
    try {
      await apiCall(`/api/transactions/${transactionId}/confirmDeliveryIsCompleted`, "PUT", {
        deliveryCode: enteredCode
      });

      alert("Delivery confirmed! Payment released to seller.");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Invalid code or verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Simple Scan Handler (No external library needed)
  const handleScanClick = () => {
    // In a real app, this would open a camera. 
    // For now, we just alert the user to type the code.
    alert("Camera scanning requires installing a library. Please enter the code manually.");
  };

  return (
    <div className="transaction-page">
      {/* Sidebar */}
      <aside className={`transaction-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Transactions</span>
          </button>
          <button onClick={() => navigate("/ai-insights")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>AI Insights</span>
          </button>
          <button onClick={() => navigate("/verification")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Verification</span>
          </button>
          <button onClick={() => navigate("/settings")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{getInitials(userData)}</div>
            <div className="user-info">
              <p className="user-name">{userData ? `${userData.firstName} ${userData.lastName}` : "Guest"}</p>
              <p className="user-email">{userData?.email || "..."}</p>
            </div>
          </div>
          <button className="sign-out-btn" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 13L3 9M3 9L7 5M3 9H11M11 3H13C14.1046 3 15 3.89543 15 5V13C15 14.1046 14.1046 15 13 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

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

            {/* Divider */}
            <div className="divider-section">
              <span className="divider-text">Or scan QR Code</span>
            </div>

            {/* Simple Scan Button (No library) */}
            <button className="btn-scan-qr" onClick={handleScanClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Scan Seller's QR Code
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