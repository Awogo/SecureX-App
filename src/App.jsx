import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandinPage from "./pages/LandinPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import PasswordSuccess from "./pages/PasswordSuccess";
import Dashboard from "./pages/Dashboard";
import CreateTransaction from "./pages/CreateTransaction";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import Verification from "./pages/Verification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-transaction" element={<CreateTransaction />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transaction-details" element={<TransactionDetails />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </Router>
  );
}
export default App;