import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";
import { apiCall } from "../api";


const DeliveryCodeSeller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDelivering, setIsDelivering] = useState(false);

  const transactionId = location.state?.transactionId;
  // Static code for demo (In real app, fetch this from API)
  const [deliveryCode, setDeliveryCode] = useState(null); 
  const [transactionStatus, setTransactionStatus] = useState("pending");

  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  useEffect(() => {
    const fetchData= async () => {
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
        console.error("Failed to fetch user data:", err);
      }
    };
    
    if (transactionId) fetchData();
  }, [transactionId]);

  // --- FIX: GENERATE OTP BY MARKING AS DELIVERED ---
  const handleMarkDelivered = async () => {
    if(!transactionId) return;
    setIsDelivering(true);
    try {
        // Call API to mark delivered
        const res = await apiCall(`/api/transactions/${transactionId}/deliver`, "PATCH");
        
        // Backend should return the OTP in the response
        const code = res.otp || res.deliveryOtp || res.data?.otp || res.data?.deliveryOtp;
        
        if (code) {
            setDeliveryCode(code.toString());
            setTransactionStatus('delivered');
            alert("Delivery marked! Here is your code.");
        } else {
            alert("Delivery marked successfully! Check your email for the code.");
            setTransactionStatus('delivered');
        }
    } catch (err) {
        alert(err.message || "Failed to update status");
    } finally {
        setIsDelivering(false);
    }
  };
return (
    <div className="transaction-page">
      {/* Sidebar */}
      <aside className={`transaction-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Sidebar content identical to Buyer component */}
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
            {/* Nav Buttons with SVGs */}
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
        {/* Header */}
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C10 4 6 7 6 10C6 12 7.34315 13 9 13H11C12.6569 13 14 12 14 10C14 7 10 4Z" stroke="#1E1E1E" strokeWidth="1.5"/><path d="M9 16H11" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span className="notification-badge">1</span>
            </button>
            <button className="user-btn">
              <div className="user-avatar-small">{getInitials(userData)}</div>
            </button>
          </div>
        </header>

        {/* View Toggle */}
        <div className="view-toggle">
          <button className="toggle-btn active">Sellers View</button>
          <button className="toggle-btn" onClick={() => navigate("/delivery-code-buyer")}>Buyers View</button>
        </div>

        {/* Content */}
        <div className="delivery-content">
          <div className="delivery-card">
            {/* Icon */}
            <div className="delivery-icon green">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="12" y="18" width="24" height="20" rx="3" stroke="#00D9A3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 18V14C16 10.4 18.4 8 22 8C25.6 8 28 10.4 8 22V18" stroke="#00D9A3" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>

            <h1 className="delivery-title">Delivery Confirmation Code</h1>
             {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* CASE 1: OTP EXISTS (Show Code) */}
                    {deliveryCode ? (
                        <>
                            <p className="delivery-subtitle">Share this code with the buyer to release payment.</p>
                            <div className="code-display-section">
                                <p className="code-label">Your Delivery Code</p>
                                <div className="code-digits">
                                    {deliveryCode.split('').map((digit, index) => (
                                    <div key={index} className="code-digit">{digit}</div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="how-works-box">
                                <h3>Instructions</h3>
                                <ol>
                                    <li>You have marked this item as delivered.</li>
                                    <li>Share the code above with the Buyer.</li>
                                    <li>Once they enter it, funds are released.</li>
                                </ol>
                            </div>
                        </>
                    ) : (
                        /* CASE 2: NO OTP YET (Show Button) */
                        <>
                            <p className="delivery-subtitle">
                                Click the button below once you have handed over the item to the buyer.
                            </p>

                            <button 
                                className="btn-verify" 
                                onClick={handleMarkDelivered} 
                                disabled={isDelivering}
                                style={{ marginTop: '20px' }}
                            >
                                {isDelivering ? "Processing..." : "Mark as Delivered"}
                            </button>

                            <div className="how-works-box" style={{ marginTop: '30px' }}>
                                <h3>What happens next?</h3>
                                <ol>
                                    <li>Click "Mark as Delivered".</li>
                                    <li>We will generate a secure code for you.</li>
                                    <li>Share that code with the buyer.</li>
                                </ol>
                            </div>
                        </>
                    )}
                </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryCodeSeller;