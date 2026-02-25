import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");

  // Mock data
  const trustScore = 89;
  const userData = {
    name: "Poly Adani",
    email: "poly@example.com",
    avatar: "PA"
  };

  const stats = [
    { 
      label: "Today's Sale", 
      value: "₦47,000", 
      change: "+12%", 
      positive: true 
    },
    { 
      label: "This Week", 
      value: "₦285,000", 
      change: "+8%", 
      positive: true 
    },
    { 
      label: "Escrow Held", 
      value: "₦485,000", 
      badge: "Secured", 
      positive: true 
    },
    { 
      label: "Total Transaction", 
      value: "₦1.2M", 
      change: "+23%", 
      positive: true 
    },
  ];

  const quickActions = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="3" width="14" height="18" rx="2" stroke="#4A5CF5" strokeWidth="2"/>
          <path d="M9 7H15M9 11H15M9 15H12" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Create Transactions",
      subtitle: "Start a new escrow transaction",
      color: "#EEF2FF"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="9" width="14" height="10" rx="2" stroke="#4A5CF5" strokeWidth="2"/>
          <path d="M9 9V7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V9" stroke="#4A5CF5" strokeWidth="2"/>
          <circle cx="12" cy="14" r="1.5" fill="#4A5CF5"/>
        </svg>
      ),
      title: "Scan OTP",
      subtitle: "Verify delivery confirmation",
      color: "#EEF2FF"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 8L10 4L17 8M3 8L10 12M3 8V16L10 20M17 8L10 12M17 8V16L10 20M10 12V20" stroke="#00D9A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "AI Business Analysis",
      subtitle: "View intelligent insights",
      color: "#D1FAE5"
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveNav("dashboard")}
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
            onClick={() => setActiveNav("/CreateTransaction")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Transactions</span>
          </button>

          <button 
            className={`nav-item ${activeNav === "ai" ? "active" : ""}`}
            onClick={() => setActiveNav("ai")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>AI Insights</span>
          </button>

          <button 
            className={`nav-item ${activeNav === "verification" ? "active" : ""}`}
            onClick={() => setActiveNav("verification")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Verification</span>
          </button>

          <button 
            className={`nav-item ${activeNav === "settings" ? "active" : ""}`}
            onClick={() => setActiveNav("settings")}
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

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
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
        <div className="dashboard-content">
          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* Trust Score Card */}
              <div className="trust-score-card">
                <div className="score-content">
                  <h2>Your Trust Score</h2>
                  <div className="score-badge">
                    <span className="score-label">Excellent</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8L7 11L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="score-subtitle">Top 15% of sellers</p>
                  <button className="view-details-btn">View Details</button>
                </div>

                <div className="score-circle">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12"/>
                    <circle cx="80" cy="80" r="70" fill="none" stroke="white" strokeWidth="12" strokeDasharray="440" strokeDashoffset="66" strokeLinecap="round" transform="rotate(-90 80 80)"/>
                  </svg>
                  <div className="score-number">{trustScore}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                    {stat.change && (
                      <span className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {stat.change}
                      </span>
                    )}
                    {stat.badge && (
                      <span className="stat-badge">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1L2 3V5.5C2 7.5 4 9.5 6 10C8 9.5 10 7.5 10 5.5V3L6 1Z" fill="#00D9A3"/>
                        </svg>
                        {stat.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-section">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  {quickActions.map((action, index) => (
                    <div key={index} className="action-card" style={{ background: action.color }}>
                      <div className="action-icon">{action.icon}</div>
                      <h4>{action.title}</h4>
                      <p>{action.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Transaction Trends */}
              <div className="chart-card">
                <h3>Transaction Trends</h3>
                <div className="chart-placeholder">
                  <svg width="100%" height="200" viewBox="0 0 400 200">
                    <polyline points="0,150 50,140 100,120 150,130 200,110 250,100 300,80 350,70 400,60" 
                      fill="none" stroke="#00D9A3" strokeWidth="2"/>
                    <polyline points="0,150 50,140 100,120 150,130 200,110 250,100 300,80 350,70 400,60 400,200 0,200" 
                      fill="url(#gradient)" opacity="0.2"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00D9A3" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#00D9A3" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot transactions"></span>
                    <span>Transactions</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot amount"></span>
                    <span>Amount (₦)</span>
                  </div>
                </div>
              </div>

              {/* Escrow Payment Distribution */}
              <div className="chart-card">
                <h3>Escrow Payment Distribution</h3>
                <div className="pie-chart">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#4A5CF5" strokeWidth="40" strokeDasharray="251 502"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#00D9A3" strokeWidth="40" strokeDasharray="188 502" strokeDashoffset="-251" transform="rotate(0 100 100)"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#2C36A2" strokeWidth="40" strokeDasharray="63 502" strokeDashoffset="-439"/>
                  </svg>
                  <div className="pie-legend">
                    <div className="pie-legend-item">
                      <span className="pie-dot" style={{ background: "#4A5CF5" }}></span>
                      <span>Crypto: 20%</span>
                    </div>
                    <div className="pie-legend-item">
                      <span className="pie-dot" style={{ background: "#00D9A3" }}></span>
                      <span>Bank Transfer: 35%</span>
                    </div>
                    <div className="pie-legend-item">
                      <span className="pie-dot" style={{ background: "#2C36A2" }}></span>
                      <span>Cash: 45%</span>
                    </div>
                  </div>
                </div>
                <button className="see-more-btn">See More</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;