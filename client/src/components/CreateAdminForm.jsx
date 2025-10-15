// src/components/CreateAdminForm.jsx
import React, { useState } from "react";
import api from "../api/api";

const CreateAdminForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await api.post("/ngos/admins", { name, email, password });
      if (res.data.success) {
        setSuccess(
          `Admin '${name}' created successfully! They will receive an email with their password.`
        );
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create admin.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add a New Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>
        )}
        {success && (
          <p className="text-green-500 bg-green-100 p-2 rounded">{success}</p>
        )}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Temporary Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default CreateAdminForm;
