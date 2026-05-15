import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/dashboard.css";
import { apiCall } from "../api";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    route: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "transactions",
    label: "Transactions",
    route: "/transactions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "ai",
    label: "AI Insights",
    route: "/ai-insights",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "verification",
    label: "Verification",
    route: "/verification",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    route: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const getInitials = (user) => {
  if (!user) return "??";
  const first = user.firstName?.[0] || "";
  const last = user.lastName?.[0] || "";
  return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || "U";
};

const getActiveKey = (pathname) => {
  if (pathname === "/dashboard") return "dashboard";
  if (pathname.startsWith("/ai-insights")) return "ai";
  if (pathname.startsWith("/verification")) return "verification";
  if (pathname.startsWith("/settings")) return "settings";
  if (
    pathname.startsWith("/transactions") ||
    pathname.startsWith("/create-transaction") ||
    pathname.startsWith("/transaction-details") ||
    pathname.startsWith("/delivery-code") ||
    pathname.startsWith("/payment")
  ) return "transactions";
  return null;
};

const DashboardSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiCall("/api/users/profile", "GET");
        const raw = res.data || res.user || res;
        let firstName = raw.firstName;
        let lastName = raw.lastName;
        if (!firstName && raw.name) {
          const parts = raw.name.split(" ");
          firstName = parts[0];
          lastName = parts.slice(1).join(" ");
        }
        setUserData({ firstName, lastName, email: raw.email });
      } catch {
        setUserData({ firstName: "Guest", lastName: "", email: "" });
      }
    };
    fetchUser();
  }, []);

  const activeKey = getActiveKey(pathname);

  return (
    <>
      <aside className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeKey === item.key ? "active" : ""}`}
              onClick={() => { navigate(item.route); onClose(); }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{getInitials(userData)}</div>
            <div className="user-info">
              <p className="user-name">
                {userData ? `${userData.firstName} ${userData.lastName}`.trim() : "Guest"}
              </p>
              <p className="user-email">{userData?.email || "..."}</p>
            </div>
          </div>
          <button
            className="sign-out-btn"
            onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 13L3 9M3 9L7 5M3 9H11M11 3H13C14.1046 3 15 3.89543 15 5V13C15 14.1046 14.1046 15 13 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
    </>
  );
};

export default DashboardSidebar;
