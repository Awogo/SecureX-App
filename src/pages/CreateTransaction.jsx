import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "../styles/transaction.css";
import { apiCall } from "../api";
import DashboardSidebar from "../components/DashboardSidebar";

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

  const handleConfirmTransaction = async () => {
    setIsSubmitting(true);
    try {
      // 1. Create the transaction record
      const payload = {
        item: formData.item,
        description: formData.description || "Escrow Transaction",
        amount: Number(formData.amount),
        currency: "NGN",
        transactionType: formData.transactionType,
        otherPartyEmail: formData.otherPartyEmail,
        otherPartyPhone: formData.otherPartyPhone || "",
        setDeliveryDays: Number(formData.setDeliveryDays) || 2,
      };

      if (formData.transactionType === "sell") {
        payload.sellerId = userData.id;
      } else {
        payload.buyerId = userData.id;
      }

      const txnRes = await apiCall("/api/transactions", "POST", payload);
      const txnData = txnRes.data || txnRes.transaction || txnRes;
      const txnId = txnData.id || txnData._id || txnData.reference;

      if (!txnId) throw new Error("Transaction ID missing.");
      setCreatedTxnId(txnId);

      // 2. If the user is the buyer, initiate Paystack payment
      if (formData.transactionType === "buy") {
        const payRes = await apiCall("/api/payment/initialize", "POST", {
          amount: Number(formData.amount),
          transactionId: txnId,
        });

        const payUrl = payRes.data?.url;
        if (!payUrl) throw new Error("Could not get payment link.");

        // Redirect to Paystack hosted checkout page
        window.location.href = payUrl;
        return;
      }

      // 3. Seller: show the success step (buyer will pay when they accept)
      setCurrentStep(6);
    } catch (err) {
      console.error("Transaction Error:", err);
      alert(err.message || "Failed to create transaction");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="transaction-page">
      <DashboardSidebar />

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
              <h2>{formData.transactionType === 'sell' ? "What are you selling?" : "What are you buying?"}</h2>
              
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