// src/pages/JobDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const JobDetailsPage = () => {
  const { id } = useParams(); // Get job ID from URL
  const { token } = useAuth(); // Check if user is logged in
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyMessage, setApplyMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/public/${id}`);
        setJob(res.data.data);
      } catch (err) {
        setError("Job not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!token) {
      return alert("Please log in to apply for this job.");
    }
    setApplyMessage("");
    try {
      const res = await api.post(`/applications/${id}`);
      if (res.data.success) {
        setApplyMessage("Successfully applied for this job!");
      }
    } catch (err) {
      setApplyMessage(err.response?.data?.msg || "Failed to apply.");
    }
  };

  if (loading) return <p className="text-center p-8">Loading job details...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;
  if (!job) return <p className="text-center p-8">Job not found.</p>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          {job.jobType}
        </span>
        <h1 className="text-4xl font-bold text-gray-800 mt-4">{job.title}</h1>
        <h2 className="text-2xl text-gray-600 font-semibold mt-2">
          {job.ngo.name}
        </h2>
        <p className="text-gray-500 mt-1">📍 {job.location}</p>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            Job Description
          </h3>
          <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
        </div>

        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Skills Required
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          {applyMessage && (
            <p
              className={`mb-4 p-3 rounded ${
                applyMessage.includes("Success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
              {applyMessage}
            </p>
          )}
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
            disabled={applyMessage.includes("Success")}>
            {applyMessage.includes("Success") ? "Applied!" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
