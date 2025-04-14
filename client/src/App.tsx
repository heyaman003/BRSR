import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/loging.page";
import Homepage from "@/pages/Home.page";
import Home from "@/components/pages/Home";
import CompanyUser from "@/pages/company.user";
import { Toaster } from "sonner";
import AdminCompany from "./pages/admin.brsr";
import NotFound from "./pages/notfound";

function App() {
  const [_isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingCsrf, setIsLoadingCsrf] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  // Check login state on component mount
    const storedLoginStatus = sessionStorage.getItem("isLoggedInEmailer");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
    setIsLoadingCsrf(true);

    // Acquire CSRF token
    fetch(import.meta.env.VITE_SERVER_URI + "/csrf", {
      method: "HEAD",
      credentials: "include",
    }).then((res) => {
      sessionStorage.setItem(
        "X-Csrf-Token",
        res.headers.get("X-Csrf-Token") || ""
      );
      setIsLoadingCsrf(false);
    });
  }, []);

  // Handle login
  const handleLogin = (companyId: string) => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedInEmailer", "true"); // Persist login state
    navigate("/brsr-making?company=" + companyId);
  };

  return (
    <>
      {!isLoadingCsrf && (
        <div>
          <Toaster richColors />
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Home />} />
            
            {/* Main page for client */}
            <Route path="/brsr-making" element={<Homepage />} />

            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

            {/* Page that lists all the users of a company */}
            <Route path="/company" element={<CompanyUser />} />

            {/* Main page for superadmin */}
            <Route path="/admin/brsr" element={<AdminCompany />} />

            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
