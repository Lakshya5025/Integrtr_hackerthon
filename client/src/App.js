// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import NgoListPage from './pages/NgoListPage';
import BrowseNGOs from './components/BrowseNGOs/BrowseNGOs';
import PostNgoPage from './pages/PostNgoPage';
import LoginPage from './pages/LoginPage';     // Import the new LoginPage
import SignupPage from './pages/SignupPage';   // Import the new SignupPage


function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post-ngo" element={<PostNgoPage />} />
          <Route path="/ngos" element={<BrowseNGOs />} />
          <Route path="/browse-ngos" element={<BrowseNGOs />} />
          <Route path="/ngo-list" element={<NgoListPage />} />
          {/* Use the new, separate routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;