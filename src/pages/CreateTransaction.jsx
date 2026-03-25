import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";
import { apiCall } from "../api";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);
  
  // Form State - Matching the NEW Backend Payload
  const [formData, setFormData] = useState({
    transactionType: "sell", 
    item: "",
    description: "",
    amount: "",
    currency: "NGN", // Changed from currencyId to currency string
    otherPartyEmail: "",
    otherPartyPhone: "",
    setDeliveryDays: 2, // New field
    // Note: We will inject buyerId/sellerId dynamically during submission
  });

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTxnId, setCreatedTxnId] = useState(null);

  const steps = [
    { number: 1, label: "Role" },
    { number: 2, label: "Details" },
    { number: 3, label: "Amount" },
    { number: 4, label: "Delivery" },
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
        setUserData({ 
          id: rawUser._id || rawUser.id, // We need the ID for the payload
          firstName, 
          lastName, 
          email: rawUser.email 
        });
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

  // --- FINAL SUBMISSION LOGIC ---
  const handleConfirmTransaction = async () => {
    setIsSubmitting(true);
    try {
      // 1. Construct Payload EXACTLY as Backend wants it
      const payload = {
        item: formData.item,
        description: formData.description || "Escrow Transaction",
        amount: Number(formData.amount),
        currency: "NGN", // "NGN"
        transactionType: formData.transactionType, // "sell" or "buy"
        otherPartyEmail: formData.otherPartyEmail,
        otherPartyPhone: formData.otherPartyPhone || "",
        setDeliveryDays: Number(formData.setDeliveryDays) || 2,
      };

      if (formData.transactionType === 'sell') {
        payload.sellerId = userData.id;
      } else {
        payload.buyerId = userData.id;
      }
      
      console.log("Submitting Payload:", payload);

      // 2. Call Create Transaction API
      const txnRes = await apiCall("/api/transactions", "POST", payload);
      const txnId = txnRes.id || txnRes._id || txnRes.reference;
      
      if (!txnId) {
        throw new Error("Transaction created but no ID returned.");
      }
      
      setCreatedTxnId(txnId);
      console.log("Transaction Created ID:", txnId);

      // 3. Get Payment Link using the endpoint provided by backend
      // We assume if I am the BUYER, I need to pay now.
      if (formData.transactionType === 'buy') {
          const paymentPayload = {
            meta: {
              amount: Number(formData.amount),
              email: userData.email,
              txnId: txnId // Pass ID just in case backend needs it
            },
            redirect_url: "https://securex-frontend.vercel.app/payment-success",
            payment_merchant: "Paystack",
            payment_title: formData.item,
            payment_for: "transaction"
          };

          console.log("Getting Payment Link:", paymentPayload);

          const payRes = await apiCall("/api/payment/get-link", "POST", paymentPayload);

          // Redirect to Paystack
          if (payRes.authorization_url) {
            window.location.href = payRes.authorization_url;
          } else if (payRes.data?.authorization_url) {
            window.location.href = payRes.data.authorization_url;
          } else {
             // If no link returned, proceed to success screen
             handleNext();
          }
      } else {
          // If I am the SELLER, no payment needed yet, just success screen
          handleNext();
      }

    } catch (err) {
      console.error("Transaction Error:", err);
      alert(err.message || "Failed to process transaction");
    } finally {
      setIsSubmitting(false);
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
          <button onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span>Dashboard</span>
          </button>

          <button className="active" onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Transactions</span>
          </button>

          <button onClick={() => navigate("/ai-insights")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>AI Insights</span>
          </button>

          <button onClick={() => navigate("/verification")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Verification</span>
          </button>

          <button onClick={() => navigate("/settings")}>
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="transaction-main">
        <header className="transaction-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
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
                <div className={`role-card ${formData.transactionType === "sell" ? "selected" : ""}`} 
                     onClick={() => setFormData({ ...formData, transactionType: "sell" })}>
                  <h3>Selling</h3>
                  <p>I'm selling a product or a service</p>
                </div>
                <div className={`role-card ${formData.transactionType === "buy" ? "selected" : ""}`} 
                     onClick={() => setFormData({ ...formData, transactionType: "buy" })}>
                  <h3>Buyer</h3>
                  <p>I'm purchasing from a seller</p>
                </div>
              </div>
              {formData.transactionType && <button className="continue-btn" onClick={handleNext}>Continue</button>}
            </div>
          )}

          {/* Step 2: Counterparty Info */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>{formData.transactionType === 'sell' ? "Who is the Buyer?" : "Who is the Seller?"}</h2>
              <p className="step-subtitle">Identify your counterparty</p>
              
              <div className="transaction-form-group">
                <label>Email Address</label>
                <input type="email" name="otherPartyEmail" placeholder="counterparty@example.com" value={formData.otherPartyEmail} onChange={handleChange} />
              </div>
              
              <div className="transaction-form-group">
                <label>Phone Number</label>
                <input type="text" name="otherPartyPhone" placeholder="08012345678" value={formData.otherPartyPhone} onChange={handleChange} />
              </div>

              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext} disabled={!formData.otherPartyEmail}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 3: Item & Amount */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Transaction Details</h2>
              
              <div className="transaction-form-group">
                <label>Item Name</label>
                <input type="text" name="item" placeholder="e.g. iPhone 15" value={formData.item} onChange={handleChange} />
              </div>

              <div className="transaction-form-group">
                <label>Description</label>
                <input type="text" name="description" placeholder="Brief description" value={formData.description} onChange={handleChange} />
              </div>

              <div className="transaction-form-group">
                <label>Amount (NGN)</label>
                <div className="amount-input">
                  <span className="currency">₦</span>
                  <input type="number" name="amount" placeholder="0.00" value={formData.amount} onChange={handleChange} />
                </div>
              </div>

              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext} disabled={!formData.amount || !formData.item}>Continue</button>
              </div>
            </div>
          )}

          {/* Step 4: Delivery Details */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Delivery Details</h2>
              <p className="step-subtitle">Set the expected delivery timeline</p>

              <div className="transaction-form-group">
                <label>Delivery Days (How many days?)</label>
                <input type="number" name="setDeliveryDays" placeholder="2" value={formData.setDeliveryDays} onChange={handleChange} />
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
              <h2>Review & Confirm</h2>
              <p className="step-subtitle">Verify all transaction details</p>

              <div className="review-card">
                <div className="review-row">
                  <span className="review-label">Role</span>
                  <span className="review-value">{formData.transactionType === 'sell' ? 'Seller' : 'Buyer'}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Item</span>
                  <span className="review-value">{formData.item}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Counterparty</span>
                  <span className="review-value">{formData.otherPartyEmail}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Amount</span>
                  <span className="review-value amount">₦{Number(formData.amount).toLocaleString()}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Delivery Days</span>
                  <span className="review-value">{formData.setDeliveryDays} Days</span>
                </div>
              </div>

              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="confirm-btn" onClick={handleConfirmTransaction} disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Confirm Transaction"}
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Success */}
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
              
              {formData.transactionType === 'buy' ? (
                 <p className="step-subtitle">Redirecting to payment...</p>
              ) : (
                 <p className="step-subtitle">Waiting for buyer to accept and pay.</p>
              )}

              <button className="complete-btn" onClick={() => navigate("/transactions")}>
                View Transactions
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateTransaction;