// src/components/CreateJobForm.jsx
import React, { useState } from "react";
import api from "../api/api";

const CreateJobForm = ({ onJobCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Volunteer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await api.post("/jobs", {
        title,
        description,
        location,
        jobType,
      });
      if (res.data.success) {
        setSuccess("Job created successfully!");
        // Clear form
        setTitle("");
        setDescription("");
        setLocation("");
        setJobType("Volunteer");
        // Notify parent component to refresh job list
        if (onJobCreated) {
          onJobCreated(res.data.data);
        }
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create job.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Post a New Opportunity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>
        )}
        {success && (
          <p className="text-green-500 bg-green-100 p-2 rounded">{success}</p>
        )}
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full p-2 border rounded">
          <option value="Volunteer">Volunteer</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Internship">Internship</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm;
