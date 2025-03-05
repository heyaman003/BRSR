import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginForm from '@/pages/Loging.page';
import LandingPage from '@/pages/Landing.page';
import Homepage from '@/pages/Home.page';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedInEmailer', 'true'); // Persist login state
    navigate('/'); 
  };

  return (
    <div>
      <Routes>
        {/* Show Landing Page when logged in, otherwise redirect to login */}
        <Route path="/" element={isLoggedIn ? <LandingPage /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/home" element={<Homepage/>} />
      </Routes>
    </div>
  );
}

export default App;
