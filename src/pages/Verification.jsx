import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/verification.css";

const Verification = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("verification");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- STATE ---
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Active Modal/Form State
  const [activeForm, setActiveForm] = useState(null); // 'identity', 'payment', 'business', 'profile'
  
  // Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    idType: "NATIONAL_ID",
    idNumber: "",
    bankName: "",
    accountNumber: "",
    businessName: "",
    businessRegNumber: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // --- API HELPER ---
  const apiCall = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  };

  // --- FETCH USER ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiCall("/api/users/profile");
        const user = res.data || res.user || res;
        
        setUserData(user);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phoneNumber || "",
          idType: user.idType || "NATIONAL_ID",
          idNumber: user.idNumber || "",
          bankName: user.bankName || "",
          accountNumber: user.accountNumber || "",
          businessName: user.businessName || "",
          businessRegNumber: user.businessRegNumber || ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      let endpoint = "/api/auth/update-kyc"; // Generic endpoint often used for all
      let payload = {};

      if (type === 'profile') {
        payload = { 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          phoneNumber: formData.phoneNumber 
        };
      } else if (type === 'identity') {
        payload = { 
          idType: formData.idType, 
          idNumber: formData.idNumber 
        };
      } else if (type === 'payment') {
        payload = { 
          bankName: formData.bankName, 
          accountNumber: formData.accountNumber 
        };
      } else if (type === 'business') {
        payload = { 
          businessName: formData.businessName, 
          businessRegNumber: formData.businessRegNumber 
        };
      }

      await apiCall(endpoint, "POST", payload);
      
      setMessage({ type: "success", text: "Updated successfully!" });
      
      // Update local user state to reflect changes immediately
      setUserData(prev => ({ ...prev, ...payload }));
      
      setTimeout(() => {
        setActiveForm(null);
        setMessage({ type: "", text: "" });
      }, 1500);

    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    if (first || last) return (first + last).toUpperCase();
    return user.email?.[0]?.toUpperCase() || "U";
  };

  // --- DYNAMIC UI DATA ---
  const getSteps = () => {
    const isIdentityComplete = userData?.idNumber;
    const isPaymentComplete = userData?.accountNumber;

    return [
      {
        id: 1,
        title: "Identity Verification",
        description: "Verify your identity with government-issued ID",
        status: isIdentityComplete ? "completed" : "in-progress",
        action: () => setActiveForm('identity')
      },
      {
        id: 2,
        title: "Payment Method",
        description: "Add and verify your payment methods",
        status: isPaymentComplete ? "completed" : "in-progress",
        action: () => setActiveForm('payment')
      },
      {
        id: 3,
        title: "Business Verification",
        description: "Verify your business credentials (optional)",
        status: "not-started",
        action: () => setActiveForm('business')
      }
    ];
  };

  return (
    <div className="verification-page">
      {/* SIDEBAR */}
      <aside className={`verification-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span>Dashboard</span>
          </button>
          <button className="active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Verification</span>
          </button>
           {/* Other Nav Links */}
           <button onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Transactions</span>
          </button>
          <button onClick={() => navigate("/settings")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2V4M10 16V18M18 10H16M4 10H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
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
      <main className="verification-main">
        <header className="verification-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.25" stroke="#7A7A7A" strokeWidth="1.5"/><path d="M12 12L15.5 15.5" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <button className="user-btn"><div className="user-avatar-small">{getInitials(userData)}</div></button>
          </div>
        </header>

        <div className="verification-content">
          <div className="page-header">
            <h1>Verification Center</h1>
            <p className="page-subtitle">Complete your profile to increase your trust score</p>
          </div>

          {/* TRUST SCORE */}
          <div className="trust-score-banner">
            <div className="banner-content">
              <div className="banner-text">
                <h2>Boost Your Trust Score</h2>
                <p>Complete all verification steps to increase your trust score.</p>
              </div>
              <div className="banner-icon">
                 {/* SVG Icon */}
                 <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="35" fill="rgba(255,255,255,0.1)"/>
                    <path d="M40 15L25 25V40C25 52.5 33.5 62 40 65C46.5 62 55 52.5 55 40V25L40 15Z" fill="white"/>
                 </svg>
              </div>
            </div>
          </div>

          {/* MODALS / FORMS */}
          {activeForm && (
            <div className="modal-overlay" onClick={() => setActiveForm(null)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setActiveForm(null)}>✕</button>
                
                {message.text && (
                  <div className={`message-box ${message.type}`}>{message.text}</div>
                )}

                {/* Profile Form */}
                {activeForm === 'profile' && (
                  <form onSubmit={(e) => handleSubmit(e, 'profile')}>
                    <h2>Update Profile</h2>
                    <div className="form-group">
                      <label>First Name</label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+234" required />
                    </div>
                    <button type="submit" disabled={submitting} className="submit-btn">
                      {submitting ? "Saving..." : "Save Profile"}
                    </button>
                  </form>
                )}

                {/* Identity Form */}
                {activeForm === 'identity' && (
                  <form onSubmit={(e) => handleSubmit(e, 'identity')}>
                    <h2>Identity Verification</h2>
                    <div className="form-group">
                      <label>ID Type</label>
                      <select name="idType" value={formData.idType} onChange={handleChange}>
                        <option value="NATIONAL_ID">National ID</option>
                        <option value="INTERNATIONAL_PASSPORT">Passport</option>
                        <option value="DRIVERS_LICENSE">Driver's License</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>ID Number</label>
                      <input name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="Enter your ID number" required />
                    </div>
                    <button type="submit" disabled={submitting} className="submit-btn">
                      {submitting ? "Verifying..." : "Submit ID"}
                    </button>
                  </form>
                )}

                {/* Payment Form */}
                {activeForm === 'payment' && (
                  <form onSubmit={(e) => handleSubmit(e, 'payment')}>
                    <h2>Payment Method</h2>
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g. GT Bank" required />
                    </div>
                    <div className="form-group">
                      <label>Account Number</label>
                      <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="0123456789" required />
                    </div>
                    <button type="submit" disabled={submitting} className="submit-btn">
                      {submitting ? "Saving..." : "Save Bank Details"}
                    </button>
                  </form>
                )}

                 {/* Business Form */}
                 {activeForm === 'business' && (
                  <form onSubmit={(e) => handleSubmit(e, 'business')}>
                    <h2>Business Verification</h2>
                    <div className="form-group">
                      <label>Business Name</label>
                      <input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Your Business Name" required />
                    </div>
                    <div className="form-group">
                      <label>Registration Number</label>
                      <input name="businessRegNumber" value={formData.businessRegNumber} onChange={handleChange} placeholder="RC-12345" required />
                    </div>
                    <button type="submit" disabled={submitting} className="submit-btn">
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                )}

              </div>
            </div>
          )}

          {/* VERIFICATION STEPS */}
          <div className="verification-steps-section">
            <h2>Verification Steps</h2>
            <div className="steps-grid">
              {getSteps().map((step) => (
                <div key={step.id} className={`step-card ${step.status}`}>
                  <div className="step-header">
                    <div className={`step-icon-wrapper ${step.status}`}>
                       {step.status === 'completed' ? (
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                       ) : (
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="currentColor" strokeWidth="2"/><path d="M4 20C4 16.68 6.69 14 10 14H14C17.31 14 20 16.68 20 20" stroke="currentColor" strokeWidth="2"/></svg>
                       )}
                    </div>
                    <div className={`status-badge ${step.status}`}>
                      {step.status === 'completed' ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <button 
                    className="step-action-btn" 
                    onClick={step.action}
                    disabled={step.status === 'completed'}
                  >
                    {step.status === 'completed' ? 'Verified' : 'Update'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK PROFILE UPDATE */}
          <div className="profile-quick-edit">
             <h3>Your Profile</h3>
             <div className="profile-info-row">
                <span>{userData?.email}</span>
                <button onClick={() => setActiveForm('profile')} className="link-btn">Edit Profile</button>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Verification;