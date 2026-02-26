import { useNavigate } from "react-router-dom";

const TransactionDetails = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      background: "#F6F7FB",
      padding: "40px 20px"
    }}>
      <div style={{
        background: "white",
        padding: "48px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <h1 style={{ 
          fontSize: "28px", 
          fontWeight: "700", 
          color: "#1E1E1E",
          marginBottom: "16px"
        }}>
          Transaction Details
        </h1>
        <p style={{
          fontSize: "16px",
          color: "#7A7A7A",
          marginBottom: "32px"
        }}>
          This page is coming soon...
        </p>
        <button 
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "14px 28px",
            background: "#4A5CF5",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;