import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('deliveryUser');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('deliveryUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('deliveryUser');
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={currentUser ? <Navigate to="/dashboard" /> : <Landing />} 
          />
          <Route 
            path="/register" 
            element={!currentUser ? <Registration onRegister={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/login" 
            element={!currentUser ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={currentUser ? <Dashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
