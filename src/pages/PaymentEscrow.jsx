import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";

const PaymentEscrow = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const transactionDetails = {
    id: "#TXN-2024-0042",
    amount: "₦125,000",
    status: "Awaiting Delivery",
    created: "Feb 19, 2026 3:45 PM"
  };

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
          <button onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Dashboard</span>
          </button>

          <button onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Transactions</span>
          </button>

          <button onClick={() => navigate("/ai-insights")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>AI Insights</span>
          </button>

          <button onClick={() => navigate("/verification")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Verification</span>
          </button>

          <button onClick={() => navigate("/settings")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">PA</div>
            <div className="user-info">
              <p className="user-name">Poly Alani</p>
              <p className="user-email">poly@example.com</p>
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
              <span className="notification-badge">1</span>
            </button>
            <button className="user-btn">
              <div className="user-avatar-small">PA</div>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="escrow-content">
          <div className="escrow-card">
            {/* Success Icon */}
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

            {/* Transaction Details */}
            <div className="details-section">
              <h3>Transaction Details</h3>
              <div className="details-grid">
                <div className="detail-row">
                  <span className="detail-label">Transaction ID</span>
                  <span className="detail-value">{transactionDetails.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value amount">{transactionDetails.amount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="status-badge status-warning">{transactionDetails.status}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Created</span>
                  <span className="detail-value">{transactionDetails.created}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="escrow-actions">
              <button className="btn-secondary" onClick={() => window.print()}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 14V8M10 8L7 11M10 8L13 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Download Receipt
              </button>
              <button className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M13 13L16 16M7 13L4 16M13 7L16 4M7 7L4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Share
              </button>
            </div>

            {/* Next Steps */}
            <div className="next-steps-section">
              <h3>Next Steps</h3>
              <p className="next-steps-text">Choose your role to proceed with delivery confirmation:</p>
              <div className="role-buttons">
                <button className="role-btn seller" onClick={() => navigate("/delivery-code-seller")}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12H24M8 12V24C8 25.1046 8.89543 26 10 26H22C23.1046 26 24 25.1046 24 24V12M8 12L10 6H22L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  I'm the Seller
                </button>
                <button className="role-btn buyer" onClick={() => navigate("/delivery-code-buyer")}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
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