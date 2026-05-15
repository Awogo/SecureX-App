import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/transaction.css";
import { apiCall } from "../api";
import DashboardSidebar from "../components/DashboardSidebar";

const Transactions = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTxn, setSelectedTxn] = useState(null);

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

  const formatCurrency = (amount, currency) => {
    const symbol = (currency || "NGN") === "USD" ? "$" : "₦";
    return `${symbol}${Number(amount || 0).toLocaleString("en-NG")}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-NG", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-NG", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const shortId = (id) => {
    if (!id) return "—";
    const str = String(id);
    return str.length > 12 ? str.slice(0, 12) + "…" : str;
  };

  useEffect(() => {
    const fetchData = async () => {
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
        setUserData({ id: rawUser._id || rawUser.id, firstName, lastName, email: rawUser.email });

        const txnRes = await apiCall("/api/transactions", "GET");
        const txnData = txnRes.data || txnRes.transactions || txnRes;
        setTransactions(Array.isArray(txnData) ? txnData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    const s = (status || "pending").toLowerCase();
    const map = {
      completed:       { text: "Completed",       cls: "status-completed" },
      delivered:       { text: "Delivered",        cls: "status-progress"  },
      "in-progress":   { text: "In Progress",      cls: "status-progress"  },
      in_progress:     { text: "In Progress",      cls: "status-progress"  },
      pending:         { text: "Pending",          cls: "status-pending"   },
      awaiting_payment:{ text: "Awaiting Payment", cls: "status-pending"   },
      cancelled:       { text: "Cancelled",        cls: "status-cancelled" },
      disputed:        { text: "Disputed",         cls: "status-cancelled" },
    };
    return map[s] || map.pending;
  };

  const getCounterparty = (txn) => {
    const uid = userData?.id;
    const isSellerMe = txn.sellerId === uid || txn.seller?.id === uid || txn.seller?._id === uid;
    if (isSellerMe) {
      const b = txn.buyer;
      if (b?.firstName) return `${b.firstName} ${b.lastName || ""}`.trim();
      return txn.otherPartyEmail || txn.buyerName || "—";
    }
    const s = txn.seller;
    if (s?.firstName) return `${s.firstName} ${s.lastName || ""}`.trim();
    return txn.sellerName || txn.otherPartyEmail || "—";
  };

  const filteredTransactions = transactions.filter((txn) => {
    const status = (txn.status || "").toLowerCase();
    if (activeTab === "all") return true;
    if (activeTab === "completed") return status === "completed";
    if (activeTab === "pending") return status === "pending" || status === "awaiting_payment";
    if (activeTab === "in-progress")
      return status === "in_progress" || status === "in-progress" || status === "delivered";
    return true;
  });

  const txnId = (txn) => txn.id || txn._id;

  return (
    <div className="transaction-page">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Transaction Detail Modal ── */}
      {selectedTxn && (
        <div className="txn-modal-overlay" onClick={() => setSelectedTxn(null)}>
          <div className="txn-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="txn-modal-header">
              <div>
                <h2 className="txn-modal-title">Transaction Details</h2>
                <p className="txn-modal-ref">Ref: {selectedTxn.reference || shortId(txnId(selectedTxn))}</p>
              </div>
              <button className="txn-modal-close" onClick={() => setSelectedTxn(null)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14M4 4L14 14" stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Amount + Status Banner */}
            <div className="txn-modal-banner">
              <div>
                <p className="txn-banner-label">Amount</p>
                <p className="txn-banner-amount">{formatCurrency(selectedTxn.amount, selectedTxn.currency)}</p>
              </div>
              <span className={`status-badge ${getStatusBadge(selectedTxn.status).cls}`}>
                {getStatusBadge(selectedTxn.status).text}
              </span>
            </div>

            <div className="txn-modal-body">
              {/* Item Details */}
              <div className="txn-modal-section">
                <h4 className="txn-section-title">Item Details</h4>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Item</span>
                  <span className="txn-detail-value">{selectedTxn.item || "—"}</span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Description</span>
                  <span className="txn-detail-value txn-detail-desc">{selectedTxn.description || "—"}</span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Type</span>
                  <span className="txn-detail-value">{selectedTxn.transactionType || selectedTxn.type || "—"}</span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Currency</span>
                  <span className="txn-detail-value">{selectedTxn.currency || "NGN"}</span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Delivery Days</span>
                  <span className="txn-detail-value">{selectedTxn.setDeliveryDays ?? 2} day{(selectedTxn.setDeliveryDays ?? 2) !== 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Parties */}
              <div className="txn-modal-section">
                <h4 className="txn-section-title">Parties</h4>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Seller</span>
                  <span className="txn-detail-value">
                    {selectedTxn.seller?.firstName
                      ? `${selectedTxn.seller.firstName} ${selectedTxn.seller.lastName || ""}`.trim()
                      : selectedTxn.sellerName || "—"}
                  </span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Buyer</span>
                  <span className="txn-detail-value">
                    {selectedTxn.buyer?.firstName
                      ? `${selectedTxn.buyer.firstName} ${selectedTxn.buyer.lastName || ""}`.trim()
                      : selectedTxn.buyerName || "—"}
                  </span>
                </div>
                {selectedTxn.otherPartyEmail && (
                  <div className="txn-detail-row">
                    <span className="txn-detail-label">Other Party Email</span>
                    <span className="txn-detail-value">{selectedTxn.otherPartyEmail}</span>
                  </div>
                )}
                {selectedTxn.otherPartyPhone && (
                  <div className="txn-detail-row">
                    <span className="txn-detail-label">Other Party Phone</span>
                    <span className="txn-detail-value">{selectedTxn.otherPartyPhone}</span>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="txn-modal-section">
                <h4 className="txn-section-title">Timeline</h4>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Created</span>
                  <span className="txn-detail-value">{formatDateTime(selectedTxn.createdAt)}</span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Last Updated</span>
                  <span className="txn-detail-value">{formatDateTime(selectedTxn.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="txn-modal-footer">
              <button className="txn-btn-close" onClick={() => setSelectedTxn(null)}>Close</button>
              {(selectedTxn.status === "in-progress" ||
                selectedTxn.status === "in_progress" ||
                selectedTxn.status === "delivered") && (
                <button
                  className="txn-btn-action"
                  onClick={() => {
                    setSelectedTxn(null);
                    navigate(`/transactions/${txnId(selectedTxn)}`);
                  }}
                >
                  Take Action
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="transaction-main">
        <header className="transaction-header">
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

        <div className="transactions-content">
          <div className="content-header">
            <div>
              <h1>Transactions</h1>
              <p className="subtitle">View and manage all your escrow transactions</p>
            </div>
            <button className="btn-new-transaction" onClick={() => navigate("/create-transaction")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              New Transaction
            </button>
          </div>

          <div className="tabs">
            {["all", "completed", "pending", "in-progress"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "all" ? "All" : tab === "in-progress" ? "In Progress" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="table-container">
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#7A7A7A" }}>
                Loading transactions...
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ color: "#7A7A7A", fontSize: 14, margin: 0 }}>No transactions found.</p>
              </div>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Item</th>
                    <th>Counterparty</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Delivery</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => {
                    const badge = getStatusBadge(txn.status);
                    return (
                      <tr key={txnId(txn)}>
                        <td className="txn-id" title={txnId(txn)}>{shortId(txn.reference || txnId(txn))}</td>
                        <td className="txn-item">{txn.item || "—"}</td>
                        <td>{getCounterparty(txn)}</td>
                        <td>{txn.transactionType || txn.type || "—"}</td>
                        <td className="amount">{formatCurrency(txn.amount, txn.currency)}</td>
                        <td>{txn.setDeliveryDays ?? 2}d</td>
                        <td>{formatDate(txn.createdAt)}</td>
                        <td>
                          <span className={`status-badge ${badge.cls}`}>{badge.text}</span>
                        </td>
                        <td>
                          <button className="btn-view" onClick={() => setSelectedTxn(txn)}>
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
