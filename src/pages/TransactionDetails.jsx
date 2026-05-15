import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/transaction.css";
import { apiCall } from "../api";
import DashboardSidebar from "../components/DashboardSidebar";

const TransactionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State
  const [userData, setUserData] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Helper: Initials
  const getInitials = (user) => {
    if (!user) return "??";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  // Fetch User & Transaction
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. User Profile
        const profileData = await apiCall("/api/users/profile", "GET");
        const rawUser = profileData.data || profileData.user || profileData;
        let firstName = rawUser.firstName;
        let lastName = rawUser.lastName;
        if (!firstName && rawUser.name) {
            const parts = rawUser.name.split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
        }
        setUserData({ id: rawUser._id, firstName, lastName, email: rawUser.email });

        // 2. Transaction Details
        // Assuming backend can search by ID or Reference
       if (id) {
            const txnRes = await apiCall(`/api/transactions/${id}`, "GET");
            setTransaction(txnRes.data || txnRes);
        }

      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchData();
  }, [id]);

  // --- ACTIONS ---

  const handleMarkDelivered = async () => {
    setActionLoading(true);
    try {
      await apiCall(`/api/transactions/${id}/deliver`, "PATCH");
      alert("Marked as delivered!");
      // Refresh data
      const txnRes = await apiCall(`/api/transactions/${id}`, "GET");
      setTransaction(txnRes.data || txnRes);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelivery = async () => {
    // In a real app, this might navigate to the OTP screen or call API directly
    // For simplicity, let's navigate to the buyer confirmation page
    navigate(`/delivery-code-buyer`, { state: { transactionId: id } });
  };

  const getStatusClass = (status) => {
    if (!status) return "status-pending";
    const s = status.toLowerCase();
    if (s === 'completed') return "status-completed";
    if (s === 'delivered') return "status-progress"; // Delivered but not confirmed
    if (s === 'in-progress') return "status-progress";
    if (s === 'cancelled') return "status-cancelled";
    return "status-pending";
  };

  return (
    <div className="transaction-page">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <main className="transaction-main">
        <header className="transaction-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Transaction Details</span>
          </button>

          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C10 4 6 7 6 10C6 12 7.34315 13 9 13H11C12.6569 13 14 12 14 10C14 7 10 4 10 4Z" stroke="#1E1E1E" strokeWidth="1.5"/><path d="M9 16H11" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span className="notification-badge">1</span>
            </button>
            <button className="user-btn">
              <div className="user-avatar-small">{getInitials(userData)}</div>
            </button>
          </div>
        </header>

        <div className="details-content-area">
          {loading ? (
            <div className="loading-state">Loading transaction...</div>
          ) : !transaction ? (
            <div className="error-state">Transaction not found.</div>
          ) : (
            <>
              {/* Top Summary Card */}
              <div className="details-summary-card">
                <div className="summary-left">
                  <span className="summary-label">Amount</span>
                  <h1 className="summary-amount">₦{transaction.amount?.toLocaleString()}</h1>
                  <span className={`status-badge ${getStatusClass(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
                <div className="summary-right">
                  <p><strong>Reference:</strong> {transaction.reference || transaction._id}</p>
                  <p><strong>Date:</strong> {new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="details-grid-layout">
                {/* Parties Info */}
                <div className="details-card">
                  <h3>Transaction Parties</h3>
                  <div className="party-row">
                    <div className="party-info">
                      <span className="party-role">Seller</span>
                      <span className="party-name">{transaction.seller?.name || transaction.sellerName || "N/A"}</span>
                    </div>
                    <div className="party-info">
                      <span className="party-role">Buyer</span>
                      <span className="party-name">{transaction.buyer?.name || transaction.buyerName || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="details-card">
                  <h3>Payment Details</h3>
                  <div className="info-row">
                    <span className="info-label">Method</span>
                    <span className="info-value">{transaction.paymentMethod || "Card"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Escrow Status</span>
                    <span className="info-value" style={{color: '#00D9A3'}}>Secured</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Description</span>
                    <span className="info-value">{transaction.description || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons-section">
                {/* Logic: If I am the seller and status is in-progress */}
                {transaction.status === 'in-progress' && transaction.seller?._id === userData?.id && (
                  <button className="btn-action primary" onClick={handleMarkDelivered} disabled={actionLoading}>
                    {actionLoading ? "Processing..." : "Mark as Delivered"}
                  </button>
                )}

                {/* Logic: If I am the buyer and status is delivered */}
                {transaction.status === 'delivered' && transaction.buyer?._id === userData?.id && (
                  <button className="btn-action primary" onClick={handleConfirmDelivery}>
                    Confirm Delivery
                  </button>
                )}

                {/* Logic: If Completed */}
                {transaction.status === 'completed' && (
                  <button className="btn-action secondary" onClick={() => window.print()}>
                    Download Receipt
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionDetails;