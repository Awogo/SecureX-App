import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/verification.css";
import { apiCall } from "../api";
import DashboardSidebar from "../components/DashboardSidebar";

const Verification = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [activeModal, setActiveModal] = useState(null); // 'identity', 'payment'
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form Data
  const [identityForm, setIdentityForm] = useState({ idType: "NIN", idNumber: "" });
  const [paymentForm, setPaymentForm] = useState({ bankName: "", accountNumber: "", accountName: "" });
  const [businessForm, setBusinessForm] = useState({ businessName: "", registrationNumber: "", cacDoc: null, tinDoc: null });

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiCall("/api/users/profile", "GET");
        const user = res.data || res.user || res;
        setUserData(user);
        
        // Pre-fill forms if data exists
        if (user.idNumber) setIdentityForm(f => ({ ...f, idNumber: user.idNumber, idType: user.idType || "NIN" }));
        if (user.bankName) setPaymentForm(f => ({ ...f, bankName: user.bankName, accountNumber: user.accountNumber, accountName: user.accountName }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Helpers
  const getInitials = (user) => {
    if (!user) return "??";
    return ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase() || "U";
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'cac') setBusinessForm(p => ({ ...p, cacDoc: file }));
    if (type === 'tin') setBusinessForm(p => ({ ...p, tinDoc: file }));
  };

  // Submissions
  const handleIdentitySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiCall("/api/auth/update-kyc", "POST", identityForm);
      setMessage({ type: "success", text: "Identity Updated!" });
      setTimeout(() => { setActiveModal(null); setMessage({}); }, 1500);
      // Refresh user
      const res = await apiCall("/api/users/profile", "GET");
      setUserData(res.data || res.user || res);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiCall("/api/auth/update-kyc", "POST", paymentForm);
      setMessage({ type: "success", text: "Payment Method Saved!" });
      setTimeout(() => { setActiveModal(null); setMessage({}); }, 1500);
      const res = await apiCall("/api/users/profile", "GET");
      setUserData(res.data || res.user || res);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBusinessSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Note: File upload usually requires FormData, simple JSON here for demo
      const payload = { 
        businessName: businessForm.businessName, 
        governmentId: businessForm.registrationNumber 
      };
      await apiCall("/api/auth/update-kyc", "POST", payload);
      alert("Business details submitted!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Derived Status
  const isIdentityComplete = userData?.idNumber;
  const isPaymentComplete = userData?.accountNumber;

  return (
    <div className="verification-page">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
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
            <p className="page-subtitle">Complete your identity and business verification to build trust</p>
          </div>

          {/* Trust Score Banner */}
          <div className="trust-score-banner">
            <div className="banner-content">
              <div className="banner-text">
                <h2>Boost Your Trust Score</h2>
                <p>Complete all verification steps to increase your trust score and unlock higher transaction limits. Verified users are 3x more likely to complete successful transactions.</p>
                
                <div className="score-values">
                  <div className="score-item">
                    <span className="score-label">Current Trust Score</span>
                    <span className="current-score-big">{userData?.trustScore ?? 0}</span>
                  </div>
                </div>
              </div>
              <div className="banner-icon">
                 <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)"/>
                    <path d="M50 15L30 27.5V47.5C30 67 42 82 50 87C58 82 70 67 70 47.5V27.5L50 15Z" fill="white"/>
                    <path d="M40 50L46 56L60 42" stroke="#4A5CF5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
            </div>
          </div>

          {/* Verification Steps Grid */}
          <div className="verification-steps-section">
            <h2>Verification Steps</h2>
            <div className="steps-grid">
              {/* Identity Card */}
              <div className={`step-card ${isIdentityComplete ? 'completed' : 'in-progress'}`}>
                <div className="step-header">
                  <div className={`step-icon-wrapper ${isIdentityComplete ? 'completed' : 'in-progress'}`}>
                     {isIdentityComplete ? (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     ) : (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="currentColor" strokeWidth="2"/><path d="M4 20C4 16.68 6.69 14 10 14H14C17.31 14 20 16.68 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                     )}
                  </div>
                  <div className={`step-status-badge ${isIdentityComplete ? 'completed' : 'in-progress'}`}>
                    {isIdentityComplete ? 'Completed' : 'In Progress'}
                  </div>
                </div>
                <h3>Identity Verification</h3>
                <p>Verify your identity with government-issued ID</p>
                <button className="step-action-btn" onClick={() => setActiveModal('identity')} disabled={isIdentityComplete}>
                  {isIdentityComplete ? 'Verified' : 'Verify Now'}
                </button>
              </div>

              {/* Payment Card */}
              <div className={`step-card ${isPaymentComplete ? 'completed' : 'in-progress'}`}>
                <div className="step-header">
                  <div className={`step-icon-wrapper ${isPaymentComplete ? 'completed' : 'in-progress'}`}>
                     {isPaymentComplete ? (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     ) : (
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 10H21" stroke="currentColor" strokeWidth="2"/></svg>
                     )}
                  </div>
                  <div className={`step-status-badge ${isPaymentComplete ? 'completed' : 'in-progress'}`}>
                    {isPaymentComplete ? 'Completed' : 'In Progress'}
                  </div>
                </div>
                <h3>Payment Method</h3>
                <p>Add and verify your payment methods</p>
                <button className="step-action-btn" onClick={() => setActiveModal('payment')} disabled={isPaymentComplete}>
                  {isPaymentComplete ? 'Verified' : 'Add Method'}
                </button>
              </div>

              {/* Business Card */}
              <div className="step-card not-started">
                <div className="step-header">
                  <div className="step-icon-wrapper not-started">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2"/></svg>
                  </div>
                  <div className="step-status-badge not-started">Not Started</div>
                </div>
                <h3>Business Verification</h3>
                <p>Verify your business credentials (optional)</p>
                <button className="step-action-btn" onClick={() => document.getElementById('business-form-section').scrollIntoView({ behavior: 'smooth' })}>
                  Start Verification
                </button>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="verification-details-grid" id="business-form-section">
            
            {/* LEFT: Personal Information */}
            <div className="verified-section">
              <div className="verified-card">
                <div className="verified-header">
                  <div className="verified-icon">
                    {isIdentityComplete ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#00D9A3"/><path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#E5E7EB"/><path d="M12 8V12M12 16H12.01" stroke="#7A7A7A" strokeWidth="2" strokeLinecap="round"/></svg>
                    )}
                  </div>
                  <div>
                    <h3>{isIdentityComplete ? "Identity Verified" : "Identity Not Verified"}</h3>
                    <p>{isIdentityComplete ? "Your identity has been successfully verified." : "Complete identity verification to build trust."}</p>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Personal Information</h4>
                  <div className="info-row">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{userData ? `${userData.firstName} ${userData.lastName}` : "—"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{userData?.email || "—"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">ID Type</span>
                    <span className="info-value">{userData?.idType || "—"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">ID Number</span>
                    <span className="info-value">{userData?.idNumber || "—"}</span>
                  </div>
                </div>

                {isPaymentComplete && (
                  <div className="info-section">
                    <h4>Payment Method</h4>
                    <div className="info-row">
                      <span className="info-label">Bank</span>
                      <span className="info-value">{userData?.bankName || "—"}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Account Number</span>
                      <span className="info-value">{userData?.accountNumber || "—"}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Account Name</span>
                      <span className="info-value">{userData?.accountName || "—"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Business Form */}
            <div className="business-form-section">
              <div className="form-card">
                <div className="optional-badge">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#4A5CF5" strokeWidth="1.5"/><path d="M8 4V8M8 11H8.01" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span>Optional Verification</span>
                </div>
                <h3>Business Information</h3>
                <p className="form-subtitle">Business verification increases your trust score and unlocks higher transaction limits</p>
                
                <form onSubmit={handleBusinessSubmit} className="kyc-form">
                  <div className="form-group">
                    <label>Business Name</label>
                    <input 
                      type="text" 
                      name="businessName" 
                      placeholder="Enter your business name" 
                      value={businessForm.businessName}
                      onChange={(e) => setBusinessForm(p => ({...p, businessName: e.target.value}))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Business Registration Number</label>
                    <input 
                      type="text" 
                      name="registrationNumber" 
                      placeholder="Enter registration number (RC, BN, etc.)" 
                      value={businessForm.registrationNumber}
                      onChange={(e) => setBusinessForm(p => ({...p, registrationNumber: e.target.value}))}
                    />
                  </div>

                  <div className="upload-section">
                    <label className="section-label">Upload Business Documents</label>
                    <div className="upload-grid">
                      <div className="upload-box">
                        <input type="file" id="cac-upload" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'cac')} style={{display: 'none'}} />
                        <label htmlFor="cac-upload" className="upload-label">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10L12 15L17 10" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15V3" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          <p className="upload-title">Upload Business Registration Certificate</p>
                          {businessForm.cacDoc ? <p className="file-name">{businessForm.cacDoc.name}</p> : <p className="upload-subtitle">Choose file</p>}
                        </label>
                      </div>

                      <div className="upload-box">
                        <input type="file" id="utility-upload" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'tin')} style={{display: 'none'}} />
                        <label htmlFor="utility-upload" className="upload-label">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10L12 15L17 10" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15V3" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          <p className="upload-title">Upload Tax Identification Number (TIN)</p>
                          {businessForm.tinDoc ? <p className="file-name">{businessForm.tinDoc.name}</p> : <p className="upload-subtitle">Choose file</p>}
                        </label>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="submit-verification-btn" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit for Verification"}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* MODALS: Identity & Payment */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            
            {message.text && <div className={`message-box ${message.type}`}>{message.text}</div>}

            {activeModal === 'identity' && (
              <form onSubmit={handleIdentitySubmit}>
                <h2>Identity Verification</h2>
                <div className="form-group">
                  <label>ID Type</label>
                  <select value={identityForm.idType} onChange={e => setIdentityForm(p => ({...p, idType: e.target.value}))}>
                    <option value="NIN">National ID</option>
                    <option value="PASSPORT">Passport</option>
                    <option value="DRIVERS_LICENSE">Driver's License</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>ID Number</label>
                  <input required placeholder="Enter your ID number" value={identityForm.idNumber} onChange={e => setIdentityForm(p => ({...p, idNumber: e.target.value}))} />
                </div>
                <button type="submit" className="submit-btn" disabled={submitting}>{submitting ? "Saving..." : "Verify ID"}</button>
              </form>
            )}

            {activeModal === 'payment' && (
              <form onSubmit={handlePaymentSubmit}>
                <h2>Payment Method</h2>
                <div className="form-group">
                  <label>Bank Name</label>
                  <input required placeholder="e.g. GT Bank" value={paymentForm.bankName} onChange={e => setPaymentForm(p => ({...p, bankName: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Account Number</label>
                  <input required placeholder="0123456789" value={paymentForm.accountNumber} onChange={e => setPaymentForm(p => ({...p, accountNumber: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Account Name</label>
                  <input required placeholder="Account Name" value={paymentForm.accountName} onChange={e => setPaymentForm(p => ({...p, accountName: e.target.value}))} />
                </div>
                <button type="submit" className="submit-btn" disabled={submitting}>{submitting ? "Saving..." : "Save Details"}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;