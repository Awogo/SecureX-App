import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";

const Transactions = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("transactions");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const userData = {
    name: "Poly Adani",
    email: "poly@example.com",
    avatar: "PA"
  };

  const transactions = [
    {
      id: "TXN-001",
      buyer: "John Doe",
      amount: "₦500,000",
      status: "completed",
      date: "Feb 24, 2026",
      type: "Sale"
    },
    {
      id: "TXN-002",
      buyer: "Jane Smith",
      amount: "₦250,000",
      status: "pending",
      date: "Feb 23, 2026",
      type: "Purchase"
    },
    {
      id: "TXN-003",
      buyer: "Mike Johnson",
      amount: "₦750,000",
      status: "in-progress",
      date: "Feb 22, 2026",
      type: "Sale"
    },
    {
      id: "TXN-004",
      buyer: "Sarah Williams",
      amount: "₦120,000",
      status: "completed",
      date: "Feb 21, 2026",
      type: "Purchase"
    },
    {
      id: "TXN-005",
      buyer: "David Brown",
      amount: "₦890,000",
      status: "cancelled",
      date: "Feb 20, 2026",
      type: "Sale"
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: "Completed", class: "status-completed" },
      pending: { text: "Pending", class: "status-pending" },
      "in-progress": { text: "In Progress", class: "status-progress" },
      cancelled: { text: "Cancelled", class: "status-cancelled" }
    };
    return badges[status] || badges.pending;
  };

  const filteredTransactions = transactions.filter(txn => {
    if (activeTab === "all") return true;
    return txn.status === activeTab;
  });

  return (
    <div className="transaction-page">
      {/* Sidebar */}
      <aside className={`transaction-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveNav("dashboard");
              navigate("/dashboard");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Dashboard</span>
          </button>

          <button 
            className={`nav-item ${activeNav === "transactions" ? "active" : ""}`}
            onClick={() => setActiveNav("transactions")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Transactions</span>
          </button>

          <button 
            className={`nav-item ${activeNav === "ai" ? "active" : ""}`}
            onClick={() => {
              setActiveNav("ai");
              navigate("/ai-insights");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>AI Insights</span>
          </button>

          <button 
            className={`nav-item ${activeNav === "verification" ? "active" : ""}`}
            onClick={() => {
              setActiveNav("verification");
              navigate("/verification");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Verification</span>
          </button>

          <button 
            className={`nav-item ${activeNav === "settings" ? "active" : ""}`}
            onClick={() => {
              setActiveNav("settings");
              navigate("/settings");
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{userData.avatar}</div>
            <div className="user-info">
              <p className="user-name">{userData.name}</p>
              <p className="user-email">{userData.email}</p>
            </div>
          </div>
          <button className="sign-out-btn" onClick={() => navigate("/login")}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 13L3 9M3 9L7 5M3 9H11M11 3H13C14.1046 3 15 3.89543 15 5V13C15 14.1046 14.1046 15 13 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="transaction-main">
        {/* Header */}
        <header className="transaction-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.25" stroke="#7A7A7A" strokeWidth="1.5"/>
              <path d="M12 12L15.5 15.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder="Search transactions..." />
          </div>

          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4C10 4 6 7 6 10C6 12 7.34315 13 9 13H11C12.6569 13 14 12 14 10C14 7 10 4 10 4Z" stroke="#1E1E1E" strokeWidth="1.5"/>
                <path d="M9 16H11" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="notification-badge">2</span>
            </button>

            <button className="user-btn">
              <div className="user-avatar-small">{userData.avatar}</div>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="transactions-content">
          <div className="content-header">
            <div>
              <h1>Transactions</h1>
              <p className="subtitle">View and manage all your transactions</p>
            </div>
            <button className="btn-new-transaction" onClick={() => navigate("/create-transaction")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              New Transaction
            </button>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Transactions
            </button>
            <button 
              className={`tab ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
            <button 
              className={`tab ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button 
              className={`tab ${activeTab === "in-progress" ? "active" : ""}`}
              onClick={() => setActiveTab("in-progress")}
            >
              In Progress
            </button>
          </div>

          {/* Table */}
          <div className="table-container">
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
                {filteredTransactions.map((txn) => {
                  const statusBadge = getStatusBadge(txn.status);
                  return (
                    <tr key={txn.id}>
                      <td className="txn-id">{txn.id}</td>
                      <td>{txn.buyer}</td>
                      <td>{txn.type}</td>
                      <td className="amount">{txn.amount}</td>
                      <td>{txn.date}</td>
                      <td>
                        <span className={`status-badge ${statusBadge.class}`}>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td>
                        <button className="btn-view">View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;