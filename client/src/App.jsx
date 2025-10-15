// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import JobDetailsPage from "./pages/JobDetailsPage"; // Import the new page

import AdminRoute from "./components/AdminRoute"; // Import the guard
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            {/* Add other admin routes here, e.g., /admin/create-job */}
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
