import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import RoleSwitcher from "./components/RoleSwitcher";

export default function App() {
  // ✅ MUST be inside component
  const [dark, setDark] = useState(false);

  return (
    <BrowserRouter>
      <div className={dark ? "dark" : ""}>
        
        {/* Navbar */}
        <nav className="flex justify-between p-4 bg-gray-800 text-white">
          <div className="flex gap-4">
            <Link to="/">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/insights">Insights</Link>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 bg-gray-600 rounded"
            >
              💡
            </button>

            <RoleSwitcher />
          </div>
        </nav>

        {/* Pages */}
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}