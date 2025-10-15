// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          NGO Portal
        </Link>
        <div>
          {token ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-800 hover:text-blue-600">
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
