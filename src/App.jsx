import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandinPage from "./pages/LandinPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateTransaction from "./pages/CreateTransaction";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-transaction" element={<CreateTransaction />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}
export default App;