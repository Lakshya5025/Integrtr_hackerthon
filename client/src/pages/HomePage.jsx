// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import api from "../api/api";
import NgoCard from "../components/NgoCard";
import JobCard from "../components/JobCard";

const HomePage = () => {
  const [ngos, setNgos] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (locationFilter) params.append("location", locationFilter);
        if (jobTypeFilter) params.append("jobType", jobTypeFilter);

        const [ngosRes, jobsRes] = await Promise.all([
          api.get("/ngos/public"), // For now, we fetch all NGOs
          api.get(`/jobs/public?${params.toString()}`),
        ]);
        setNgos(ngosRes.data.data);
        setJobs(jobsRes.data.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locationFilter, jobTypeFilter]); // Re-fetch when filters change

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">Join a Cause</h1>
        <p className="text-lg text-gray-600 mt-2">
          Find volunteer opportunities and NGOs that match your passion.
        </p>
      </header>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="p-2 border rounded-md flex-grow"
        />
        <select
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="p-2 border rounded-md">
          <option value="">All Job Types</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <main className="grid md:grid-cols-2 gap-10">
        {/* Jobs Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-700">
            Opportunities
          </h2>
          <div className="space-y-6">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p>No job opportunities found with the current filters.</p>
            )}
          </div>
        </section>

        {/* NGOs Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-700">
            Registered NGOs
          </h2>
          <div className="space-y-6">
            {ngos.map((ngo) => (
              <NgoCard key={ngo._id} ngo={ngo} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
