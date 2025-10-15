// src/pages/JobDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api"; // Ensure this path is correct

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      console.log(id);
      try {
        setLoading(true);
        const res = await api.get(`/jobs/public/${id}`);
        setJob(res.data.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch job details:", err);
        setError("Could not load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="text-center mt-10">Job not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="mt-2 text-xl text-gray-700">
          at{" "}
          <Link
            to={`/ngo/${job.ngo?._id}`}
            className="text-blue-600 hover:underline">
            {job.ngo?.name || "NGO Name Unavailable"}
          </Link>
        </p>

        <div className="mt-4 text-md text-gray-600">
          <span className="font-semibold">Location:</span> {job.location}
        </div>
        <div className="mt-2 text-md text-gray-600">
          <span className="font-semibold">Job Type:</span> {job.jobType}
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Job Description
          </h2>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
