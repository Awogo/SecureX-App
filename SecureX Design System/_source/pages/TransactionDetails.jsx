import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";
import { apiCall } from "../api";

const TransactionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const [activeNav, setActiveNav] = useState("transactions");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State
  const [userData, setUserData] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Helper: Initials
  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  // Fetch User & Transaction
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. User Profile
        const profileData = await apiCall("/api/users/profile", "GET");
        const rawUser = profileData.data || profileData.user || profileData;
        let firstName = rawUser.firstName;
        let lastName = rawUser.lastName;
        if (!firstName && rawUser.name) {
            const parts = rawUser.name.split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
        }
        setUserData({ id: rawUser._id, firstName, lastName, email: rawUser.email });

        // 2. Transaction Details
        // Assuming backend can search by ID or Reference
       if (id) {
            const txnRes = await apiCall(`/api/transactions/${id}`, "GET");
            setTransaction(txnRes.data || txnRes);
        }

      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchData();
  }, [id]);

  // --- ACTIONS ---

  const handleMarkDelivered = async () => {
    setActionLoading(true);
    try {
      await apiCall(`/api/transactions/${id}/deliver`, "PATCH");
      alert("Marked as delivered!");
      // Refresh data
      const txnRes = await apiCall(`/api/transactions/${id}`, "GET");
      setTransaction(txnRes.data || txnRes);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelivery = async () => {
    // In a real app, this might navigate to the OTP screen or call API directly
    // For simplicity, let's navigate to the buyer confirmation page
    navigate(`/delivery-code-buyer`, { state: { transactionId: id } });
  };

  const getStatusClass = (status) => {
    if (!status) return "status-pending";
    const s = status.toLowerCase();
    if (s === 'completed') return "status-completed";
    if (s === 'delivered') return "status-progress"; // Delivered but not confirmed
    if (s === 'in-progress') return "status-progress";
    if (s === 'cancelled') return "status-cancelled";
    return "status-pending";
  };

  return (
    <div className="transaction-page">
      {/* SIDEBAR */}
      <aside className={`transaction-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`} onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span>Dashboard</span>
          </button>
          <button className={`nav-item ${activeNav === "transactions" ? "active" : ""}`} onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Transactions</span>
          </button>
          <button className={`nav-item ${activeNav === "ai" ? "active" : ""}`} onClick={() => navigate("/ai-insights")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>AI Insights</span>
          </button>
          <button className={`nav-item ${activeNav === "verification" ? "active" : ""}`} onClick={() => navigate("/verification")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Verification</span>
          </button>
          <button className={`nav-item ${activeNav === "settings" ? "active" : ""}`} onClick={() => navigate("/settings")}>
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

      {/* MAIN CONTENT */}
      <main className="transaction-main">
        <header className="transaction-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Transaction Details</span>
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

        <div className="details-content-area">
          {loading ? (
            <div className="loading-state">Loading transaction...</div>
          ) : !transaction ? (
            <div className="error-state">Transaction not found.</div>
          ) : (
            <>
              {/* Top Summary Card */}
              <div className="details-summary-card">
                <div className="summary-left">
                  <span className="summary-label">Amount</span>
                  <h1 className="summary-amount">₦{transaction.amount?.toLocaleString()}</h1>
                  <span className={`status-badge ${getStatusClass(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
                <div className="summary-right">
                  <p><strong>Reference:</strong> {transaction.reference || transaction._id}</p>
                  <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="details-grid-layout">
                {/* Parties Info */}
                <div className="details-card">
                  <h3>Transaction Parties</h3>
                  <div className="party-row">
                    <div className="party-info">
                      <span className="party-role">Seller</span>
                      <span className="party-name">{transaction.seller?.name || transaction.sellerName || "N/A"}</span>
                    </div>
                    <div className="party-info">
                      <span className="party-role">Buyer</span>
                      <span className="party-name">{transaction.buyer?.name || transaction.buyerName || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="details-card">
                  <h3>Payment Details</h3>
                  <div className="info-row">
                    <span className="info-label">Method</span>
                    <span className="info-value">{transaction.paymentMethod || "Card"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Escrow Status</span>
                    <span className="info-value" style={{color: '#00D9A3'}}>Secured</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Description</span>
                    <span className="info-value">{transaction.description || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons-section">
                {/* Logic: If I am the seller and status is in-progress */}
                {transaction.status === 'in-progress' && transaction.seller?._id === userData?.id && (
                  <button className="btn-action primary" onClick={handleMarkDelivered} disabled={actionLoading}>
                    {actionLoading ? "Processing..." : "Mark as Delivered"}
                  </button>
                )}

                {/* Logic: If I am the buyer and status is delivered */}
                {transaction.status === 'delivered' && transaction.buyer?._id === userData?.id && (
                  <button className="btn-action primary" onClick={handleConfirmDelivery}>
                    Confirm Delivery
                  </button>
                )}

                {/* Logic: If Completed */}
                {transaction.status === 'completed' && (
                  <button className="btn-action secondary" onClick={() => window.print()}>
                    Download Receipt
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionDetails;