import AuthTabs from "./components/auth/AuthTabs.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/protected/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardTabs from "./components/dashboard/DashboardTabs.jsx";
import UserProfile from "./components/dashboard/UserProfile.jsx";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AuthTabs />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardTabs" element={<DashboardTabs />} />
          <Route path="/profile" element={<UserProfile/>} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
