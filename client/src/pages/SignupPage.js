// src/pages/SignupPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/common/AuthForm';
import './AuthPage.css';

const SignupPage = () => {
  const [currentRole, setCurrentRole] = useState('user');

  return (
    <div className="auth-container">
      <div className="role-switcher">
        <button onClick={() => setCurrentRole(currentRole === 'user' ? 'admin' : 'user')}>
          {currentRole === 'user' ? 'Admin Portal →' : 'Volunteer Portal →'}
        </button>
      </div>

      <div className="auth-card">
        <h2>{currentRole === 'user' ? 'Volunteer Registration' : 'Admin Registration'}</h2>

        <AuthForm role={currentRole} mode="signup" />

        <Link to="/login" className="toggle-button-link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;