import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/aiinsights.css";
import { apiCall } from "../api";

const AIInsights = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("ai");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- STATE ---
  const [userData, setUserData] = useState(null);
  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- HELPER: INITIALS ---
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

  // --- DATA FETCHING ---
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

        setUserData({
          id: rawUser.id || rawUser._id,
          firstName: firstName || "User",
          lastName: lastName || "",
          email: rawUser.email,
        });

        // 2. Fetch AI Insights
        // NOTE: Replace '/api/ai/insights' with your actual endpoint if different
        try {
          const insightsRes = await apiCall("/api/ai/insights", "GET");
          setInsightsData(insightsRes.data || insightsRes);
        } catch (err) {
          console.log("AI Insights endpoint not ready, using mock data.");
          // Mock data fallback to match the image
          setInsightsData({
            alerts: [
              { type: "success", title: "Trust Score Improved", value: "+5%", desc: "Based on recent transactions" },
              { type: "info", title: "3 New High-Value Buyers", value: "Detected", desc: "In the last 24 hours" },
              { type: "warning", title: "Zero Fraud Detection", value: "0 Issues", desc: "System secure" }
            ],
            topBuyers: [
              { name: "Emeka Okafor", trust: 98, transactions: 45, total: "₦2.5M" },
              { name: "Sarah Johnson", trust: 95, transactions: 32, total: "₦1.8M" },
              { name: "Chinedu Eze", trust: 92, transactions: 28, total: "₦1.2M" }
            ],
            recommendations: [
              "Increase your transaction limit to capture more high-value buyers.",
              "Verify your business account to improve trust score by 10%.",
              "Enable 2FA for enhanced security on large transactions."
            ]
          });
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ai-page">
      {/* SIDEBAR */}
      <aside className={`ai-sidebar ${sidebarOpen ? "open" : ""}`}>
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
          <button className={`nav-item ${activeNav === "ai" ? "active" : ""}`} onClick={() => setActiveNav("ai")}>
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
      <main className="ai-main">
        <header className="ai-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.25" stroke="#7A7A7A" strokeWidth="1.5"/><path d="M12 12L15.5 15.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search insights..." />
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

        <div className="ai-content">
          <div className="page-header">
            <h1>AI Business Intelligence</h1>
            <p className="page-subtitle">Leverage artificial intelligence to optimize your business</p>
          </div>

          {loading ? <div className="loading-state">Loading Insights...</div> : (
            <>
              {/* ALERT CARDS */}
              <div className="insights-alerts-grid">
                {insightsData?.alerts?.map((alert, index) => (
                  <div key={index} className={`alert-card ${alert.type}`}>
                    <div className="alert-icon">
                      {alert.type === 'success' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 5V11C4 16.55 8.84 21.74 12 23C15.16 21.74 20 16.55 20 11V5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {alert.type === 'info' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12V8M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {alert.type === 'warning' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/><path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>}
                    </div>
                    <div className="alert-content">
                      <h3>{alert.title}</h3>
                      <p>{alert.desc}</p>
                    </div>
                    <div className="alert-value">{alert.value}</div>
                  </div>
                ))}
              </div>

              {/* CHARTS (Reusing Dashboard Visuals) */}
              <div className="charts-row">
                <div className="chart-card large">
                  <h3>Transaction Trends</h3>
                  <div className="chart-placeholder">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      <polyline points="0,150 50,140 100,120 150,130 200,110 250,100 300,80 350,70 400,60" fill="none" stroke="#4A5CF5" strokeWidth="2"/>
                      <polyline points="0,150 50,140 100,120 150,130 200,110 250,100 300,80 350,70 400,60 400,200 0,200" fill="url(#gradAI)" opacity="0.2"/>
                      <defs><linearGradient id="gradAI" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#4A5CF5" stopOpacity="0.3"/><stop offset="100%" stopColor="#4A5CF5" stopOpacity="0"/></linearGradient></defs>
                    </svg>
                  </div>
                </div>

                <div className="chart-card">
                  <h3>Escrow Distribution</h3>
                  <div className="pie-container">
                    <svg width="160" height="160" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#4A5CF5" strokeWidth="30" strokeDasharray="188 502"/>
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#00D9A3" strokeWidth="30" strokeDasharray="140 502" strokeDashoffset="-188"/>
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#2C36A2" strokeWidth="30" strokeDasharray="94 502" strokeDashoffset="-328"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* TOP BUYERS & RECOMMENDATIONS */}
              <div className="bottom-section">
                <div className="top-buyers-card">
                  <h3>Top 3 Trusted Buyers</h3>
                  <div className="buyers-list">
                    {insightsData?.topBuyers?.map((buyer, index) => (
                      <div key={index} className="buyer-row">
                        <div className="buyer-info">
                          <span className="buyer-name">{buyer.name}</span>
                          <span className="buyer-stats">Trust: {buyer.trust}% • {buyer.transactions} Transactions</span>
                        </div>
                        <div className="buyer-total">{buyer.total}</div>
                        <button className="connect-btn">Connect</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recommendations-card">
                  <h3>AI Recommendations</h3>
                  <ul className="rec-list">
                    {insightsData?.recommendations?.map((rec, index) => (
                      <li key={index}>
                        <span className="rec-icon">💡</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIInsights;