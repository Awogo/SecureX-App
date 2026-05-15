import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    // 🔥 DEMO FORCE SUCCESS
    if (otp.length === 6) {
      alert("Verification Successful ✅");
      navigate("/dashboard");
      return;
    }

    alert("Enter valid OTP");
  };

  return (
    <div className="otp-page">
      <h2>Enter OTP</h2>

      <input
        type="text"
        maxLength="6"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default VerifyOtp;