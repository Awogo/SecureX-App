import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/verification.css";
import { apiCall } from "../api"; 

const Verification = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("verification");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // --- USER & UI STATE ---
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kycLoading, setKycLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- FORM DATA (Matching Image & API) ---
  const [kycData, setKycData] = useState({
    businessName: "",
    registrationNumber: "",
    businessType: "LLC",
    address: "",
    phoneNumber: "",
    governmentId: "",
    accountNumber: "",
    bankCode: "",
  });

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

  // --- 1. FETCH USER PROFILE ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await apiCall("/api/users/profile", "GET");
        const rawUser = profileData.data || profileData.user || profileData;
        
        let firstName = rawUser.firstName;
        let lastName = rawUser.lastName;

        if (!firstName && rawUser.name) {
            const parts = rawUser.name.split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
        }

        const normalizedUser = {
          id: rawUser.id || rawUser._id,
          firstName: firstName || "User",
          lastName: lastName || "",
          email: rawUser.email,
          trustScore: rawUser.trustScore || 85
        };
        
        setUserData(normalizedUser);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setUserData({ firstName: "Guest", lastName: "", email: "guest@example.com", trustScore: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  // --- INPUT HANDLER ---
  const handleKycChange = (e) => {
    const { name, value } = e.target;
    setKycData(prev => ({ ...prev, [name]: value }));
  };

  // --- 2. KYC SUBMISSION ---
  const handleKycSubmit = async (e) => {
    e.preventDefault();
    setKycLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiCall("/api/auth/update-kyc", "POST", kycData);
      if (response.success || response.message) {
        setSuccess(response.message || "KYC Updated Successfully!");
      } else {
        setError("Failed to update KYC. Please check your details.");
      }
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setKycLoading(false);
    }
  };

  // --- STATIC UI DATA WITH EXACT SVGS RESTORED ---
  const verificationSteps = [
    {
      id: 1,
      title: "Identity Verification",
      description: "Verify your identity with government-issued ID",
      status: "completed",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Payment Method",
      description: "Add and verify your payment methods",
      status: "in-progress",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Business Verification",
      description: "Verify your business credentials (optional)",
      status: "not-started",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  const personalInfo = {
    fullName: userData ? `${userData.firstName} ${userData.lastName}` : "Loading...",
    dateOfBirth: "January 15, 1990",
    idNumber: "NIN-1234567890"
  };

  const verifiedDocuments = [
    { name: "National ID Card (Front)", verified: true },
    { name: "National ID Card (Back)", verified: true },
    { name: "Selfie Verification", verified: true }
  ];

  return (
    <div className="verification-page">
      {/* --- SIDEBAR --- */}
      <aside className={`verification-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`} onClick={() => { setActiveNav("dashboard"); navigate("/dashboard"); }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span>Dashboard</span>
          </button>
          <button className={`nav-item ${activeNav === "transactions" ? "active" : ""}`} onClick={() => { setActiveNav("transactions"); navigate("/transactions"); }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Transactions</span>
          </button>
          <button className={`nav-item ${activeNav === "ai" ? "active" : ""}`} onClick={() => { setActiveNav("ai"); navigate("/ai-insights"); }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>AI Insights</span>
          </button>
          <button className={`nav-item ${activeNav === "verification" ? "active" : ""}`} onClick={() => setActiveNav("verification")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Verification</span>
          </button>
          <button className={`nav-item ${activeNav === "settings" ? "active" : ""}`} onClick={() => { setActiveNav("settings"); navigate("/settings"); }}>
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

      {/* --- MAIN CONTENT --- */}
      <main className="verification-main">
        <header className="verification-header">
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

        <div className="verification-content">
          <div className="page-header">
            <h1>Verification Center</h1>
            <p className="page-subtitle">Complete your identity and business verification to build trust</p>
          </div>

          {/* TRUST SCORE BANNER */}
          <div className="trust-score-banner">
            <div className="banner-content">
              <div className="banner-text">
                <h2>Boost Your Trust Score</h2>
                <p>Complete all verification steps to increase your trust score and unlock higher transaction limits.</p>
                <div className="score-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${userData?.trustScore || 0}%` }}></div>
                  </div>
                  <div className="score-labels">
                    <span className="current-score">Current Trust Score: <strong>{userData?.trustScore || 0}</strong></span>
                    <span className="potential-score">Potential Score: <strong className="green">95+</strong></span>
                  </div>
                </div>
              </div>
              <div className="banner-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="rgba(255,255,255,0.2)"/>
                  <path d="M24 8L14 14V22C14 28.5 19 35 24 36C29 35 34 28.5 34 22V14L24 8Z" fill="white"/>
                  <path d="M20 24L22 26L28 20" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* VERIFICATION STEPS GRID */}
          <div className="verification-steps-section">
            <h2>Verification Steps</h2>
            <div className="steps-grid">
              {verificationSteps.map((step) => (
                <div key={step.id} className={`step-card ${step.status}`}>
                  <div className="step-header">
                    <div className={`step-icon-wrapper ${step.status}`}>
                      {step.icon}
                    </div>
                    <div className={`step-status-badge ${step.status}`}>
                      {step.status === 'completed' && (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#00D9A3"/>
                            <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Completed</span>
                        </>
                      )}
                      {step.status === 'in-progress' && (
                        <>
                          <div className="spinner"></div>
                          <span>In Progress</span>
                        </>
                      )}
                      {step.status === 'not-started' && (
                        <span>Not Started</span>
                      )}
                    </div>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  
                  {/* Action Buttons Logic (Optional visual) */}
                  {step.status === 'completed' && (
                    <button className="step-btn view">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      View Details
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="verification-details-grid">
            
            {/* LEFT: PERSONAL INFO */}
            <div className="verified-section">
              <div className="verified-card">
                <div className="verified-header">
                  <div className="verified-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#00D9A3"/>
                      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Identity Verified</h3>
                    <p>Your identity has been successfully verified</p>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Personal Information</h4>
                  <div className="info-row">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{personalInfo.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date of Birth</span>
                    <span className="info-value">{personalInfo.dateOfBirth}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">ID Number</span>
                    <span className="info-value">{personalInfo.idNumber}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Verified Documents</h4>
                  {verifiedDocuments.map((doc, index) => (
                    <div key={index} className="document-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="#D1FAE5"/>
                        <path d="M5 8L7 10L11 6" stroke="#00D9A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: BUSINESS FORM */}
            <div className="business-form-section">
              <div className="form-card">
                <h3>Business Information</h3>
                <p className="form-subtitle">Complete your business verification (optional)</p>
                
                <form onSubmit={handleKycSubmit} className="kyc-form">
                  {error && <div className="auth-error">{error}</div>}
                  {success && <div className="auth-success">{success}</div>}
                  
                  <div className="form-group">
                    <label>Business Name</label>
                    <input 
                      type="text" 
                      name="businessName" 
                      placeholder="Enter business name" 
                      value={kycData.businessName}
                      onChange={handleKycChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Registration Number</label>
                      <input 
                        type="text" 
                        name="registrationNumber" 
                        placeholder="RC-123456" 
                        value={kycData.registrationNumber}
                        onChange={handleKycChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Business Type</label>
                      <select 
                        name="businessType" 
                        value={kycData.businessType}
                        onChange={handleKycChange}
                      >
                        <option value="LLC">LLC</option>
                        <option value="PLC">PLC</option>
                        <option value="Sole Proprietor">Sole Proprietor</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Office Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      placeholder="Enter business address" 
                      value={kycData.address}
                      onChange={handleKycChange}
                    />
                  </div>

                  <div className="upload-grid">
                    <div className="upload-box">
                      <span>+</span>
                      <p>Upload CAC Document</p>
                    </div>
                    <div className="upload-box">
                      <span>+</span>
                      <p>Upload Utility Bill</p>
                    </div>
                  </div>

                  <button type="submit" className="auth-button" disabled={kycLoading}>
                    {kycLoading ? "Submitting..." : "Submit for Verification"}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Verification;