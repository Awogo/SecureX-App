import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { apiCall } from "../api";
import DashboardSidebar from "../components/DashboardSidebar";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // States for Data
  // --- STATE ---
const [userData, setUserData] = useState({
  firstName: "Blessing",
  lastName: "",
  email: "blessing@example.com"
});
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- HELPER FUNCTION ---
  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || " "
  };

  // --- MAIN DATA FETCHING LOGIC ---
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const profileData = await apiCall("/api/users/profile", "GET");
      console.log("PROFILE RESPONSE:", profileData);

      // 🔥 HANDLE ALL POSSIBLE BACKEND FORMATS
      let user = profileData.data || profileData.user || profileData;

      // 🔥 NORMALIZE USER OBJECT
      const normalizedUser = {
        id: user.id || user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };

      // ✅ ONLY CHECK USER EXISTS (NOT id anymore)
      if (!normalizedUser.firstName) {
        throw new Error("Invalid user data");
      }

      setUserData(normalizedUser);

      // 🔥 FETCH DASHBOARD STATS
      if (normalizedUser.id) {
        const statsData = await apiCall(`/api/dashboard/${normalizedUser.id}`, "GET");
        setDashboardStats(statsData.data || statsData);
      }

    } catch (error) {
      console.error("Dashboard Error:", error);

      // ✅ FALLBACK (for demo safety)
      setUserData({
        firstName: "Blessing",
        lastName: "Demo",
        email: "demo@securex.com"
      });

    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // --- PREPARE STATS DATA ---
  const trustScore = dashboardStats?.trustScore || 0;

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "₦0";
    return `₦${Number(amount).toLocaleString("en-NG")}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  };

  const recentTransactions = dashboardStats?.recentTransactions || [];

  const completionRate = dashboardStats?.totalTransactions
    ? Math.round((dashboardStats.completedTransactions / dashboardStats.totalTransactions) * 100)
    : 0;

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(dashboardStats?.totalRevenue),
      change: `${dashboardStats?.completedTransactions || 0} completed`,
      positive: true,
    },
    {
      label: "Total Transactions",
      value: String(dashboardStats?.totalTransactions || 0),
      change: `${dashboardStats?.pendingTransactions || 0} pending`,
      positive: true,
    },
    {
      label: "In Escrow",
      value: String(dashboardStats?.pendingTransactions || 0),
      badge: "Secured",
      positive: true,
    },
    {
      label: "Completed",
      value: String(dashboardStats?.completedTransactions || 0),
      change: `${completionRate}% rate`,
      positive: true,
    },
  ];

  // --- QUICK ACTIONS DATA ---
  const quickActions = [
    {
      title: "Create SafePay link",
      subtitle: "Generate a unique payment URL",
      icon: <DocumentTextIcon style={{ width: 18, height: 18 }} />,
      iconColor: "var(--indigo-600)",
      route: "/create-transaction",
    },
    {
      title: "Verify identity",
      subtitle: "Upload your government ID",
      icon: <ShieldCheckIcon style={{ width: 18, height: 18 }} />,
      iconColor: "var(--mint-600)",
      route: "/verification",
    },
    {
      title: "AI Insights",
      subtitle: "View smart recommendations",
      icon: <SparklesIcon style={{ width: 18, height: 18 }} />,
      iconColor: "#F59E0B",
      route: "/ai-insights",
    },
  ];

  // --- CHART DATA ---
  const completed = dashboardStats?.completedTransactions || 0;
  const pending = dashboardStats?.pendingTransactions || 0;
  const totalTxns = dashboardStats?.totalTransactions || 0;
  const otherCount = Math.max(0, totalTxns - completed - pending);

  // Polyline: oldest → newest, map amounts to SVG coords (viewBox 0 0 400 200)
  const chartTransactions = [...recentTransactions].reverse();
  const maxAmount = Math.max(...chartTransactions.map((t) => t.amount || 0), 1);
  const staticPoints = "0,150 50,140 100,120 150,130 200,110 250,100 300,80 350,70 400,60";
  const linePoints = chartTransactions.length > 1
    ? chartTransactions.map((t, i) => {
        const x = Math.round((i / (chartTransactions.length - 1)) * 400);
        const y = Math.round(180 - ((t.amount || 0) / maxAmount) * 160);
        return `${x},${y}`;
      }).join(" ")
    : chartTransactions.length === 1
      ? `0,${Math.round(180 - ((chartTransactions[0].amount || 0) / maxAmount) * 160)} 400,${Math.round(180 - ((chartTransactions[0].amount || 0) / maxAmount) * 160)}`
      : staticPoints;
  const fillPoints = linePoints + " 400,200 0,200";

  // Pie (donut r=80, circumference≈502)
  const C = 502;
  const completedLen = totalTxns > 0 ? (completed / totalTxns) * C : 0;
  const pendingLen   = totalTxns > 0 ? (pending   / totalTxns) * C : 0;
  const otherLen     = totalTxns > 0 ? (otherCount / totalTxns) * C : 0;
  const completedPct = totalTxns > 0 ? Math.round((completed  / totalTxns) * 100) : 0;
  const pendingPct   = totalTxns > 0 ? Math.round((pending    / totalTxns) * 100) : 0;
  const otherPct     = totalTxns > 0 ? 100 - completedPct - pendingPct : 0;
  // --- RENDER ---
  return (
    <div className="dashboard-page">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
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

        <div className="dashboard-content">
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h3>Loading Dashboard...</h3>
              <p>Waking up the server, please wait...</p>
            </div>
          ) : error ? (
             <div className="auth-error">{error}</div>
          ) : (
            <div className="content-grid">
              {/* Left Column */}
              <div className="left-column">
                {/* Trust Score Card */}
                <div className="trust-score-card">
                  <div className="score-content">
                    <h2>Your Trust Score</h2>
                    {trustScore > 0 ? (
                      <>
                        <div className="score-badge">
                          <span className="score-label">
                            {trustScore >= 80 ? "Excellent" : trustScore >= 60 ? "Good" : trustScore >= 40 ? "Fair" : "Building"}
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8L7 11L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <p className="score-subtitle">Based on your transaction history</p>
                      </>
                    ) : (
                      <>
                        <div className="score-badge" style={{ background: "rgba(255,255,255,0.15)" }}>
                          <span className="score-label">Not yet scored</span>
                        </div>
                        <p className="score-subtitle">Complete transactions to build your score</p>
                      </>
                    )}
                    <button className="view-details-btn" onClick={() => navigate("/verification")}>
                      {trustScore > 0 ? "View Details" : "Get Verified"}
                    </button>
                  </div>
                  <div className="score-circle">
                    <svg width="160" height="160" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12"/>
                      <circle cx="80" cy="80" r="70" fill="none" stroke="white" strokeWidth="12" strokeDasharray="440"
                        strokeDashoffset={trustScore > 0 ? 440 - (440 * trustScore / 100) : 440}
                        strokeLinecap="round" transform="rotate(-90 80 80)"/>
                    </svg>
                    <div className="score-number">{trustScore > 0 ? trustScore : "--"}</div>
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
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {stat.change}
                        </span>
                      )}
                      {stat.badge && (
                        <span className="stat-badge">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L2 3V5.5C2 7.5 4 9.5 6 10C8 9.5 10 7.5 10 5.5V3L6 1Z" fill="#00D9A3"/></svg>
                          {stat.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="card">
                  <h3 style={{ marginTop: 0, marginBottom: 16 }}>Quick actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {quickActions.map((action, index) => (
                      <div
                        key={index}
                        className="action-card"
                        onClick={() => navigate(action.route)}
                      >
                        <div
                          className="action-icon"
                          style={{ color: action.iconColor }}
                        >
                          {action.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4>{action.title}</h4>
                          <p>{action.subtitle}</p>
                        </div>
                        <ChevronRightIcon
                          className="action-card-arrow"
                          style={{ width: 16, height: 16, color: 'var(--ink-300)' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1E1E1E" }}>Recent Transactions</h3>
                    <button
                      onClick={() => navigate("/transactions")}
                      style={{ background: "none", border: "none", color: "var(--indigo-600)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                      View all
                    </button>
                  </div>
                  {recentTransactions.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#7A7A7A", fontSize: 14, padding: "24px 0", margin: 0 }}>
                      No transactions yet. Create your first SafePay link to get started.
                    </p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {recentTransactions.map((txn, i) => (
                        <div
                          key={txn.id || i}
                          style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                            borderBottom: i < recentTransactions.length - 1 ? "1px solid #F0F0F0" : "none",
                          }}
                        >
                          <div style={{
                            width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                            background: txn.status === "completed" ? "#D1FAE5" : txn.status === "disputed" ? "#FEE2E2" : "#EEF2FF",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              {txn.status === "completed"
                                ? <path d="M3 8L6 11L13 4" stroke="#00D9A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                : <path d="M8 4V8L10.5 10.5" stroke={txn.status === "disputed" ? "#EF4444" : "#4A5CF5"} strokeWidth="1.5" strokeLinecap="round"/>
                              }
                            </svg>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1E1E1E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {txn.description || txn.itemName || "Transaction"}
                            </p>
                            <p style={{ margin: 0, fontSize: 12, color: "#7A7A7A" }}>{formatDate(txn.createdAt)}</p>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1E1E1E" }}>{formatCurrency(txn.amount)}</p>
                            <span style={{
                              fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
                              background: txn.status === "completed" ? "#D1FAE5" : txn.status === "disputed" ? "#FEE2E2" : "#EEF2FF",
                              color: txn.status === "completed" ? "#00D9A3" : txn.status === "disputed" ? "#EF4444" : "#4A5CF5",
                            }}>
                              {txn.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                {/* Transaction Trends */}
                <div className="chart-card">
                  <h3>Transaction Trends</h3>
                  <div className="chart-placeholder">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00D9A3" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#00D9A3" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <polyline points={linePoints} fill="none" stroke="#00D9A3" strokeWidth="2"/>
                      <polyline points={fillPoints} fill="url(#gradient)" opacity="0.2"/>
                    </svg>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-dot transactions"></span>
                      <span>{chartTransactions.length > 0 ? "Amount (₦)" : "Amount (₦)"}</span>
                    </div>
                  </div>
                </div>

                {/* Escrow Payment Distribution */}
                <div className="chart-card">
                  <h3>Transaction Breakdown</h3>
                  <div className="pie-chart">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {totalTxns > 0 ? (
                        <>
                          <circle cx="100" cy="100" r="80" fill="none" stroke="#00D9A3" strokeWidth="40"
                            strokeDasharray={`${completedLen} ${C}`} strokeDashoffset="0"/>
                          <circle cx="100" cy="100" r="80" fill="none" stroke="#4A5CF5" strokeWidth="40"
                            strokeDasharray={`${pendingLen} ${C}`} strokeDashoffset={-completedLen}/>
                          <circle cx="100" cy="100" r="80" fill="none" stroke="#2C36A2" strokeWidth="40"
                            strokeDasharray={`${otherLen} ${C}`} strokeDashoffset={-(completedLen + pendingLen)}/>
                        </>
                      ) : (
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E7EB" strokeWidth="40" strokeDasharray={`${C} ${C}`}/>
                      )}
                    </svg>
                    <div className="pie-legend">
                      <div className="pie-legend-item">
                        <span className="pie-dot" style={{ background: "#00D9A3" }}></span>
                        <span>Completed: {completedPct}%</span>
                      </div>
                      <div className="pie-legend-item">
                        <span className="pie-dot" style={{ background: "#4A5CF5" }}></span>
                        <span>In Escrow: {pendingPct}%</span>
                      </div>
                      <div className="pie-legend-item">
                        <span className="pie-dot" style={{ background: "#2C36A2" }}></span>
                        <span>Disputed: {otherPct}%</span>
                      </div>
                    </div>
                  </div>
                  <button className="see-more-btn" onClick={() => navigate("/transactions")}>View All Transactions</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;