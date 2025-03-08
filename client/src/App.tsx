import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from '@/pages/Loging.page';
import Homepage from '@/pages/Home.page';
import Home from '@/components/pages/Home';
import ProtectedRoute from '@/components/ProtectedRoute'; // Import the new component
import CompanyUser from './pages/CompanyUser';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedInEmailer');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedInEmailer', 'true'); // Persist login state
    navigate('/brsr-making');
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brsr-making" element={<ProtectedRoute element={<Homepage />} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/company" element={<CompanyUser />} />
      </Routes>
    </div>
  );
}

export default App;
