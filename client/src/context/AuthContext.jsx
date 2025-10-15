// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Here you would typically fetch user data with the token
      // For now, we'll just assume the token is valid.
      // A future step could be adding a /api/users/me route
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // In a real app, decode token or fetch user data here
      // setUser(decodedUserData);
      navigate("/"); // Redirect to home page after login
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });
      return response.data; // Return the success message to the component
    } catch (err) {
      setError(
        err.response?.data?.msg || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
