import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";
import { apiCall } from "../api";

const PaymentEscrow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [transaction, setTransaction] = useState(null);

  // Get ID from navigation state
  const transactionId = location.state?.transactionId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch User
        const profileData = await apiCall("/api/users/profile", "GET");
        const rawUser = profileData.data || profileData.user || profileData;
        let firstName = rawUser.firstName;
        let lastName = rawUser.lastName;
        if (!firstName && rawUser.name) {
            const parts = rawUser.name.split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
        }
        setUserData({ id: rawUser._id || rawUser.id, firstName, lastName, email: rawUser.email });

        // 2. Fetch Transaction Details (Optional but recommended)
        if (transactionId) {
           const txnRes = await apiCall(`/api/transactions/${transactionId}`, "GET");
           setTransaction(txnRes.data || txnRes);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [transactionId]);

  const getInitials = (user) => {
    if (!user) return "??";
    return ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase();
  };

  return (
    <div className="transaction-page">
      {/* Sidebar (Standard) */}
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
          <button className="active" onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Transactions</span>
          </button>
          {/* Other Nav Items... */}
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{getInitials(userData)}</div>
            <div className="user-info">
              <p className="user-name">{userData ? `${userData.firstName} ${userData.lastName}` : "Guest"}</p>
              <p className="user-email">{userData?.email || "..."}</p>
            </div>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="transaction-main">
        <header className="transaction-header">
           <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
           </button>
           <div className="search-bar">
             <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.25" stroke="#7A7A7A" strokeWidth="1.5"/><path d="M12 12L15.5 15.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round"/></svg>
             <input type="text" placeholder="Search..." />
           </div>
        </header>

        <div className="escrow-content">
          <div className="escrow-card">
            <div className="success-icon-large">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#D1FAE5"/>
                <circle cx="40" cy="40" r="32" fill="#00D9A3"/>
                <path d="M28 40L36 48L52 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h1 className="escrow-title">Payment Held in Escrow</h1>
            <p className="escrow-subtitle">
              Your transaction has been created successfully. The payment is secured and will be released upon delivery confirmation.
            </p>

            <div className="details-section">
              <h3>Transaction Details</h3>
              <div className="details-grid">
                <div className="detail-row">
                  <span className="detail-label">Transaction ID</span>
                  <span className="detail-value">{transactionId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value amount">₦{transaction?.amount?.toLocaleString() || "..."}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="status-badge status-warning">{transaction?.status || "Awaiting Delivery"}</span>
                </div>
              </div>
            </div>

            <div className="next-steps-section">
              <h3>Next Steps</h3>
              <p className="next-steps-text">Choose your role to proceed with delivery confirmation:</p>
              <div className="role-buttons">
                <button className="role-btn seller" onClick={() => navigate("/delivery-code-seller", { state: { transactionId } })}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 12H4M4 12L8 8M4 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  I'm the Seller
                </button>
                <button className="role-btn buyer" onClick={() => navigate("/delivery-code-buyer", { state: { transactionId } })}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  I'm the Buyer
                </button>
              </div>
            </div>

            <button className="btn-secondary-full" onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentEscrow;