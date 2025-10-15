// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from "react";
import api from "../api/api";
import CreateJobForm from "../components/CreateJobForm"; // Import
import CreateAdminForm from "../components/CreateAdminForm"; // Import

const AdminDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({}); // Store applications by jobId

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const jobsRes = await api.get("/jobs"); // The protected route for admin's jobs
        setJobs(jobsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    };
    fetchAdminData();
  }, []);

  const fetchApplications = async (jobId) => {
    // If already fetched, don't fetch again
    if (applications[jobId]) return;

    try {
      const res = await api.get(`/applications/${jobId}`);
      setApplications((prev) => ({ ...prev, [jobId]: res.data.data }));
    } catch (error) {
      console.error(`Failed to fetch applications for job ${jobId}`, error);
    }
  };
  const handleJobCreated = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Job Management */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Job Postings</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* ... (existing job mapping code) ... */}
            </div>
          </div>
        </div>

        {/* Right Column: Admin Tools */}
        <div>
          <CreateJobForm onJobCreated={handleJobCreated} />
          <CreateAdminForm />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
