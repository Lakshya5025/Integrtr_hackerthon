// src/components/AdminRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
