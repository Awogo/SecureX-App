import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBlue from "../assets/logo-blue.png";
import "../styles/transaction.css";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    buyerName: "",
    amount: "",
    paymentMethod: "",
  });

  const steps = [
    { number: 1, label: "Role" },
    { number: 2, label: "Buyer" },
    { number: 3, label: "Amount" },
    { number: 4, label: "Payment" },
    { number: 5, label: "Review" },
    { number: 6, label: "Complete" },
  ];

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

  return (
    <div className="transaction-page">
      {/* Sidebar */}
      <aside className="transaction-sidebar">
        <div className="sidebar-header">
          <img src={logoBlue} alt="SecureX" className="sidebar-logo" />
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Dashboard</span>
          </button>

          <button onClick={() => navigate("/transactions")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Transactions</span>
          </button>

          <button onClick={() => navigate("/ai-insights")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>AI Insights</span>
          </button>

          <button onClick={() => navigate("/verification")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L4 5V9C4 12.5 7 16 10 17C13 16 16 12.5 16 9V5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Verification</span>
          </button>

          <button onClick={() => navigate("/settings")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">PA</div>
            <div className="user-info">
              <p className="user-name">Poly Alani</p>
              <p className="user-email">poly@example.com</p>
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
      <main className="transaction-main">
        {/* Header */}
        <header className="transaction-header">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Create Transaction</span>
          </button>

          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4C10 4 6 7 6 10C6 12 7.34315 13 9 13H11C12.6569 13 14 12 14 10C14 7 10 4 10 4Z" stroke="#1E1E1E" strokeWidth="1.5"/>
                <path d="M9 16H11" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="notification-badge">1</span>
            </button>
            <button className="user-btn">
              <div className="user-avatar-small">PA</div>
            </button>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step) => (
            <div key={step.number} className="step-wrapper">
              <div className={`step-circle ${currentStep >= step.number ? "active" : ""} ${currentStep > step.number ? "completed" : ""}`}>
                {currentStep > step.number ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8L7 11L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              {step.number < 6 && <div className={`step-line ${currentStep > step.number ? "completed" : ""}`} />}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="form-container">
          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>I am...</h2>
              <p className="step-subtitle">choose your role in this transaction</p>

              <div className="role-options">
                <div 
                  className={`role-card ${formData.role === "seller" ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, role: "seller" })}
                >
                  <div className="role-icon seller">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M8 12H24M8 12V24C8 25.1046 8.89543 26 10 26H22C23.1046 26 24 25.1046 24 24V12M8 12L10 6H22L24 12" stroke="#00D9A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Selling</h3>
                  <p>I'm selling a product or a service</p>
                </div>

                <div 
                  className={`role-card ${formData.role === "buyer" ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, role: "buyer" })}
                >
                  <div className="role-icon buyer">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="12" r="4" stroke="#4A5CF5" strokeWidth="2"/>
                      <path d="M10 24C10 20.6863 12.6863 18 16 18C19.3137 18 22 20.6863 22 24" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3>Buyer</h3>
                  <p>I'm purchasing from a seller</p>
                </div>
              </div>

              {formData.role && (
                <button className="continue-btn" onClick={handleNext}>
                  Continue
                </button>
              )}
            </div>
          )}

          {/* Step 2: Buyer Information */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Who is the Buyer?</h2>
              <p className="step-subtitle">Identify your counterparty</p>

              <div className="transaction-form-group">
                <label>Buyer Name</label>
                <input
                  type="text"
                  name="buyerName"
                  placeholder="Enter name or email"
                  value={formData.buyerName}
                  onChange={handleChange}
                />
              </div>

              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext} disabled={!formData.buyerName}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Amount */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>How much are you charging?</h2>
              <p className="step-subtitle">Enter the transaction amount</p>

              <div className="transaction-form-group">
                <label>Amount</label>
                <div className="amount-input">
                  <span className="currency">₦</span>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext} disabled={!formData.amount}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment Method */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Select Payment Method</h2>
              <p className="step-subtitle">Choose how you want to transact</p>

              <div className="payment-options">
                <div 
                  className={`payment-card ${formData.paymentMethod === "card" ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="#4A5CF5" strokeWidth="2"/>
                    <path d="M3 10H21" stroke="#4A5CF5" strokeWidth="2"/>
                  </svg>
                  <span>Credit/Debit Card</span>
                </div>

                <div 
                  className={`payment-card ${formData.paymentMethod === "bank" ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: "bank" })}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 10H21M7 15H10" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="#4A5CF5" strokeWidth="2"/>
                  </svg>
                  <span>Bank Transfer</span>
                </div>

                <div 
                  className={`payment-card ${formData.paymentMethod === "crypto" ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: "crypto" })}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#4A5CF5" strokeWidth="2"/>
                    <path d="M9 12L11 14L15 10" stroke="#4A5CF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Cryptocurrency</span>
                </div>
              </div>

              <div className="button-group">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="continue-btn" onClick={handleNext} disabled={!formData.paymentMethod}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Confirm */}
          {currentStep === 5 && (
            <div className="form-step">
              <h2>Review & Confirm</h2>
              <p className="step-subtitle">Verify all transaction details</p>

              <div className="review-card">
                <div className="review-row">
                  <span className="review-label">Date</span>
                  <span className="review-value">27-02-2026</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Name</span>
                  <span className="review-value">{formData.buyerName}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Payment Method</span>
                  <span className="review-value">
                    {formData.paymentMethod === "card" && "Credit/Debit Card"}
                    {formData.paymentMethod === "bank" && "Bank Transfer"}
                    {formData.paymentMethod === "crypto" && "Cryptocurrency"}
                  </span>
                </div>
                <div className="review-row">
                  <span className="review-label">Amount</span>
                  <span className="review-value amount">₦{formData.amount}</span>
                </div>
              </div>

              <div className="button-group">
                <button className="cancel-btn">Cancel Transaction</button>
                <button className="confirm-btn" onClick={handleNext}>Confirm Transaction</button>
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
              <p className="step-subtitle">Upload proof of delivery to release payment</p>

              <div className="upload-area">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 32V16M24 16L18 22M24 16L30 22" stroke="#7A7A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M38 28V38C38 39.1046 37.1046 40 36 40H12C10.8954 40 10 39.1046 10 38V28" stroke="#7A7A7A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="upload-title">Upload Proof of Delivery</p>
                <p className="upload-subtitle">PNG, JPG, PDF up to 10MB</p>
              </div>

              <button className="complete-btn" onClick={() => navigate("/dashboard")}>
                Complete & Release Payment
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateTransaction;