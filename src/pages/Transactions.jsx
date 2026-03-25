import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";
import { apiCall } from "../api";

const Transactions = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("transactions");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // State for Data
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper: Initials
  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    if (first || last) return (first + last).toUpperCase();
    if (user.name) {
      const parts = user.name.split(" ");
      return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
    }
    return user.email?.[0]?.toUpperCase() || "U";
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch User Profile
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

        // 2. Fetch Transactions
        const txnRes = await apiCall("/api/transactions", "GET");
        setTransactions(txnRes.data || txnRes || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: "Completed", class: "status-completed" },
      pending: { text: "Pending", class: "status-pending" },
      "in-progress": { text: "In Progress", class: "status-progress" },
      cancelled: { text: "Cancelled", class: "status-cancelled" },
      delivered: { text: "Delivered", class: "status-progress" } // Added for API consistency
    };
    return badges[status?.toLowerCase()] || badges.pending;
  };

  const filteredTransactions = transactions.filter(txn => {
    if (activeTab === "all") return true;
    return txn.status?.toLowerCase() === activeTab;
  });

  return (
    <div className="transaction-page">
      {/* Sidebar */}
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
          <button className={`nav-item ${activeNav === "transactions" ? "active" : ""}`} onClick={() => setActiveNav("transactions")}>
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

      {/* Main Content */}
      <main className="transaction-main">
        <header className="transaction-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.25" stroke="#7A7A7A" strokeWidth="1.5"/><path d="M12 12L15.5 15.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search transactions..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C10 4 6 7 6 10C6 12 7.34315 13 9 13H11C12.6569 13 14 12 14 10C14 7 10 4 10 4Z" stroke="#1E1E1E" strokeWidth="1.5"/><path d="M9 16H11" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span className="notification-badge">2</span>
            </button>
            <button className="user-btn">
              <div className="user-avatar-small">{getInitials(userData)}</div>
            </button>
          </div>
        </header>

        <div className="transactions-content">
          <div className="content-header">
            <div>
              <h1>Transactions</h1>
              <p className="subtitle">View and manage all your transactions</p>
            </div>
            <button className="btn-new-transaction" onClick={() => navigate("/create-transaction")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              New Transaction
            </button>
          </div>

          <div className="tabs">
            <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All Transactions</button>
            <button className={`tab ${activeTab === "completed" ? "active" : ""}`} onClick={() => setActiveTab("completed")}>Completed</button>
            <button className={`tab ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>Pending</button>
            <button className={`tab ${activeTab === "in-progress" ? "active" : ""}`} onClick={() => setActiveTab("in-progress")}>In Progress</button>
          </div>

          <div className="table-container">
            {loading ? (
              <div style={{textAlign: 'center', padding: '20px'}}>Loading transactions...</div>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Counterparty</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{textAlign: 'center'}}>No transactions found.</td>
                    </tr>
                  ) : (
                    filteredTransactions.map((txn) => {
                      const statusBadge = getStatusBadge(txn.status);
                      return (
                        <tr key={txn._id || txn.id}>
                          <td className="txn-id">{txn.reference || txn._id}</td>
                          <td>{txn.counterparty?.name || txn.buyerName || "N/A"}</td>
                          <td>{txn.type || "Sale"}</td>
                          <td className="amount">₦{txn.amount?.toLocaleString()}</td>
                          <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-badge ${statusBadge.class}`}>
                              {statusBadge.text}
                            </span>
                          </td>
                          <td>
                            <button className="btn-view" onClick={() => navigate(`/transactions/${txn._id}`)}>View</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;