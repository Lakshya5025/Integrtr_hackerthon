// src/components/layout/Navbar.js
import React from 'react';
import { ReactComponent as NgoLogo } from '../../assets/images/ngo-logo.svg';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <NgoLogo className="logo-icon" /> {/* Use the imported SVG component */}
        <span className="logo-text">NGO Portal</span> {/* Keep the text next to it */}
      </a>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/ngos">Browse NGOs</a>
        <a href="/post-ngo">Post NGO</a>
        <a href="/login">Login</a>
        <a href="/signup" className="signup-button">Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;