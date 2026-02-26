import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";

const DeliveryCodeSeller = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("seller");

  // Generate random 5-digit code
  const deliveryCode = "62481";

  const handleGenerateNew = () => {
    // In real app, this would call API to generate new code
    window.location.reload();
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

          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Proof of Delivery</span>
          </button>

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

        {/* View Toggle */}
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === "seller" ? "active" : ""}`}
            onClick={() => setViewMode("seller")}
          >
            Sellers View
          </button>
          <button 
            className={`toggle-btn ${viewMode === "buyer" ? "active" : ""}`}
            onClick={() => navigate("/delivery-code-buyer")}
          >
            Buyers View
          </button>
        </div>

        {/* Content */}
        <div className="delivery-content">
          <div className="delivery-card">
            {/* Icon */}
            <div className="delivery-icon green">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="12" y="18" width="24" height="20" rx="3" stroke="#00D9A3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 18V14C16 10.4 18.4 8 22 8C25.6 8 28 10.4 28 14V18" stroke="#00D9A3" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>

            <h1 className="delivery-title">Delivery Confirmation Code</h1>
            <p className="delivery-subtitle">
              Share this code with the buyer to confirm delivery and release payment
            </p>

            {/* Code Display */}
            <div className="code-display-section">
              <p className="code-label">Your 5 digit code</p>
              <div className="code-digits">
                {deliveryCode.split('').map((digit, index) => (
                  <div key={index} className="code-digit">{digit}</div>
                ))}
              </div>
              <p className="code-instruction">Share this code with the buyer to confirm delivery</p>
            </div>

            {/* Divider */}
            <div className="divider-section">
              <span className="divider-text">Or share QR Code</span>
            </div>

            {/* QR Code */}
            <div className="qr-section">
              <p className="qr-instruction">Let the buyer scan this for instant confirmation</p>
              <div className="qr-code">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <rect width="200" height="200" rx="12" fill="#000"/>
                  <rect x="20" y="20" width="160" height="160" rx="8" stroke="#00D9A3" strokeWidth="4" fill="none"/>
                  {/* QR Pattern */}
                  <g fill="#00D9A3">
                    <rect x="70" y="70" width="15" height="15"/>
                    <rect x="70" y="115" width="15" height="15"/>
                    <rect x="115" y="70" width="15" height="15"/>
                    <rect x="115" y="115" width="15" height="15"/>
                    <rect x="92" y="92" width="16" height="16"/>
                  </g>
                </svg>
              </div>
            </div>

            {/* How It Works */}
            <div className="how-works-box">
              <h3>How It Works</h3>
              <ol>
                <li>Deliver the product to the buyer</li>
                <li>Share this code with them</li>
                <li>They enter the code to confirm delivery</li>
                <li>Payment is instantly released to your account</li>
              </ol>
            </div>

            {/* Generate New Button */}
            <button className="btn-outline" onClick={handleGenerateNew}>
              Generate New Code
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryCodeSeller;