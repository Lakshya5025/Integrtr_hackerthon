// src/pages/HomePage.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBook, faLeaf } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero-section">
        <img 
          // --- NEW IMAGE URL ---
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Volunteers working together" 
          className="hero-image" 
        />
        <div className="hero-content">
          <h1>Welcome to the NGO Portal</h1>
          <p>Connecting volunteers with organizations that make a difference.</p>
          <button className="hero-button">Find an NGO</button>
        </div>
      </header>

{/* Major Causes Section */}
      <section className="causes-section">
        <div className="causes-header">
          <h2>Major Causes</h2>
          <p className="subtitle">Find opportunities to contribute to the causes you care about most.</p>
        </div>
        <div className="causes-container">
          <div className="cause-card">
            {/* New wrapper for the icon */}
            <div className="icon-wrapper health">
              <FontAwesomeIcon icon={faHeart} size="2x" />
            </div>
            <h3>Health</h3>
            <p>Support health initiatives and medical camps across the nation.</p>
          </div>
          <div className="cause-card">
            <div className="icon-wrapper education">
              <FontAwesomeIcon icon={faBook} size="2x" />
            </div>
            <h3>Education</h3>
            <p>Help provide quality education for underprivileged children.</p>
          </div>
          <div className="cause-card">
            <div className="icon-wrapper environment">
              <FontAwesomeIcon icon={faLeaf} size="2x" />
            </div>
            <h3>Environment</h3>
            <p>Participate in conservation and green earth projects.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;