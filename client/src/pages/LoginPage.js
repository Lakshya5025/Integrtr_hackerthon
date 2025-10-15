// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/common/AuthForm';
import './AuthPage.css'; // We can reuse the same CSS file

const LoginPage = () => {
  const [currentRole, setCurrentRole] = useState('user');

  return (
    <div className="auth-container">
      <div className="role-switcher">
        <button onClick={() => setCurrentRole(currentRole === 'user' ? 'admin' : 'user')}>
          {currentRole === 'user' ? 'Admin Portal →' : 'Volunteer Portal →'}
        </button>
      </div>

      <div className="auth-card">
        <h2>{currentRole === 'user' ? 'Volunteer Portal' : 'Admin Portal'}</h2>
        
        <AuthForm role={currentRole} mode="login" />
        
        <Link to="/signup" className="toggle-button-link">
          Need an account? Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;