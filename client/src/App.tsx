import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginForm from "@/pages/Loging.page";
import Homepage from "@/pages/Home.page";
import Home from "@/components/pages/Home";
import ProtectedRoute from "@/components/ProtectedRoute"; // Import the new component
import CompanyUser from "./pages/CompanyUser";
import { Toaster } from "sonner";
import AdminCompany from "./pages/Admin.Brsr";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem("isLoggedInEmailer");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }

    fetch(import.meta.env.VITE_SERVER_URI + "/csrf", {
      method: "HEAD",
      credentials: "include",
    }).then((res) =>
      sessionStorage.setItem(
        "X-Csrf-Token",
        res.headers.get("X-Csrf-Token") || ""
      )
    );
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedInEmailer", "true"); // Persist login state
    navigate("/brsr-making");
  };

  return (
    <div>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/brsr-making"
          element={<ProtectedRoute element={<Homepage />} />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/company" element={<CompanyUser />} />
        <Route path="/admin/brsr/company" element={<AdminCompany />} />
      </Routes>
    </div>
  );
}

export default App;
