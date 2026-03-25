import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";
import { apiCall } from "../api";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createdTxnId, setCreatedTxnId] = useState(null);
  
  const [formData, setFormData] = useState({
    type: "", // 'buy' or 'sell'
    counterpartyEmail: "", // or ID
    amount: "",
    paymentMethod: "card",
    description: ""
  });

  const steps = [
    { number: 1, label: "Role" },
    { number: 2, label: "Details" },
    { number: 3, label: "Amount" },
    { number: 4, label: "Payment" },
    { number: 5, label: "Review" },
    { number: 6, label: "Complete" },
  ];

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
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
        setUserData({ firstName, lastName, email: rawUser.email });
      } catch (err) {
        console.error("Not logged in");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- API SUBMISSION ---
  const handleConfirmTransaction = async () => {
    setLoading(true);
    try {
      const payload = {
        type: formData.type, // 'buy' or 'sell'
        amount: Number(formData.amount),
        paymentMethod: formData.paymentMethod,
        counterpartyEmail: formData.counterpartyEmail, // Assuming backend expects email
        description: formData.description || "Escrow Transaction"
      };

      const res = await apiCall("/api/transactions", "POST", payload);
      
      // Save ID for step 6
      setCreatedTxnId(res.data?._id || res._id || res.transactionId);
      
      // If Payment Gateway URL is returned (Paystack), redirect logic could go here
      // if (res.authorization_url) window.location.href = res.authorization_url;
      
      handleNext(); // Go to success step
    } catch (err) {
      alert(err.message || "Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  // --- FILE UPLOAD (Proof of Delivery) ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !createdTxnId) return;

    const uploadData = new FormData();
    uploadData.append("proof", file);
    // Note: apiCall helper might need adjustment for FormData headers, 
    // assuming apiCall handles it or we use fetch directly for this specific case.
    
    try {
      // Using fetch directly for FormData to avoid Content-Type issues with apiCall wrapper
      const token = localStorage.getItem("token");
      await fetch(`https://securex-backend-ikr8.onrender.com/api/transactions/${createdTxnId}/deliver`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`
            // Do NOT set Content-Type here, browser sets it with boundary for FormData
        },
        body: uploadData
      });
      alert("Proof uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="transaction-page">
      {/* Sidebar */}
      <aside className="transaction-sidebar">
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate("/dashboard")}><span>Dashboard</span></button>
          <button className="active" onClick={() => navigate("/transactions")}><span>Transactions</span></button>
          <button onClick={() => navigate("/ai-insights")}><span>AI Insights</span></button>
          <button onClick={() => navigate("/verification")}><span>Verification</span></button>
          <button onClick={() => navigate("/settings")}><span>Settings</span></button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{getInitials(userData)}</div>
            <div className="user-info">
              <p className="user-name">{userData ? `${userData.firstName} ${userData.lastName}` : "Guest"}</p>
              <p className="user-email">{userData?.email || "..."}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="transaction-main">
        <header className="transaction-header">
          <button className="back-btn" onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Create Transaction</span>
          </button>
          <div className="header-actions">
             <button className="user-btn"><div className="user-avatar-small">{getInitials(userData)}</div></button>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step) => (
            <div key={step.number} className="step-wrapper">
              <div className={`step-circle ${currentStep >= step.number ? "active" : ""} ${currentStep > step.number ? "completed" : ""}`}>
                {currentStep > step.number ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8L7 11L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : <span>{step.number}</span>}
              </div>
              {step.number < 6 && <div className={`step-line ${currentStep > step.number ? "completed" : ""}`} />}
            </div>
          ))}
        </div>

        <div className="form-container">
          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>I am...</h2>
              <p className="step-subtitle">Choose your role in this transaction</p>
              <div className="role-options">
                <div className={`role-card ${formData.type === "sell" ? "selected" : ""}`} onClick={() => setFormData({ ...formData, type: "sell" })}>
                  <h3>Seller</h3>
                  <p>I'm selling a product or a service</p>
                </div>
                <div className={`role-card ${formData.type === "buy" ? "selected" : ""}`} onClick={() => setFormData({ ...formData, type: "buy" })}>
                  <h3>Buyer</h3>
                  <p>I'm purchasing from a seller</p>
                </div>
              </div>
              {formData.type && <button className="continue-btn" onClick={handleNext}>Continue</button>}
            </div>
          )}

          {/* Step 2: Counterparty Info */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>{formData.type === 'sell' ? "Who is the Buyer?" : "Who is the Seller?"}</h2>
              <p className="step-subtitle">Enter their email address</p>
              <div className="transaction-form-group">
                <label>Email Address</label>
                <input type="email" name="counterpartyEmail" placeholder="counterparty@example.com" value={formData.counterpartyEmail} onChange={handleChange} />
              </div>
              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext} disabled={!formData.counterpartyEmail}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 3: Amount */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Transaction Amount</h2>
              <div className="transaction-form-group">
                <label>Amount (NGN)</label>
                <div className="amount-input">
                  <span className="currency">₦</span>
                  <input type="number" name="amount" placeholder="0.00" value={formData.amount} onChange={handleChange} />
                </div>
              </div>
              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext} disabled={!formData.amount}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 4: Payment Method */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Select Payment Method</h2>
              <div className="payment-options">
                <div className={`payment-card ${formData.paymentMethod === "card" ? "selected" : ""}`} onClick={() => setFormData({ ...formData, paymentMethod: "card" })}>
                  <span>Credit/Debit Card</span>
                </div>
                <div className={`payment-card ${formData.paymentMethod === "bank" ? "selected" : ""}`} onClick={() => setFormData({ ...formData, paymentMethod: "bank" })}>
                  <span>Bank Transfer</span>
                </div>
              </div>
              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="form-step">
              <h2>Review Details</h2>
              <div className="review-card">
                <div className="review-row">
                  <span className="review-label">Role</span>
                  <span className="review-value">{formData.type === 'sell' ? 'Seller' : 'Buyer'}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Counterparty</span>
                  <span className="review-value">{formData.counterpartyEmail}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Amount</span>
                  <span className="review-value amount">₦{Number(formData.amount).toLocaleString()}</span>
                </div>
              </div>
              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="confirm-btn" onClick={handleConfirmTransaction} disabled={loading}>
                  {loading ? "Processing..." : "Confirm Transaction"}
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Success & Upload */}
          {currentStep === 6 && (
            <div className="form-step success">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#D1FAE5"/>
                  <circle cx="32" cy="32" r="24" fill="#00D9A3"/>
                  <path d="M22 32L28 38L42 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Transaction Created!</h2>
              <p className="step-subtitle">Transaction ID: {createdTxnId}</p>

              {/* If Seller, show upload option */}
              {formData.type === 'sell' && (
                <div className="upload-area">
                  <input type="file" id="file-upload" style={{display: 'none'}} onChange={handleFileUpload} />
                  <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M24 32V16M24 16L18 22M24 16L30 22" stroke="#7A7A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M38 28V38C38 39.1046 37.1046 40 36 40H12C10.8954 40 10 39.1046 10 38V28" stroke="#7A7A7A" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p className="upload-title">Upload Proof of Delivery</p>
                    <p className="upload-subtitle">Click to browse files</p>
                  </label>
                </div>
              )}

              <button className="complete-btn" onClick={() => navigate("/transactions")}>
                Finish
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateTransaction;