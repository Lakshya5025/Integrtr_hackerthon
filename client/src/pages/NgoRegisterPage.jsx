// src/pages/NgoRegisterPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NgoRegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [causes, setCauses] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(""); // To show success message
  const { registerNgo, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    const response = await registerNgo(name, email, password, causes, location);
    if (response && response.success) {
      setMessage(
        "Registration successful! Please check your email to verify your account."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register Your NGO</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <p className="text-green-500 bg-green-100 p-3 rounded">{message}</p>
          )}
          {error && (
            <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium">NGO Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Causes (comma-separated)
            </label>
            <input
              type="text"
              value={causes}
              onChange={(e) => setCauses(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NgoRegisterPage;
