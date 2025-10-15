// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from "react";
import api from "../api/api";
import CreateJobForm from "../components/CreateJobForm";
import CreateAdminForm from "../components/CreateAdminForm";
import JobCard from "../components/JobCard"; // Make sure to import JobCard

const AdminDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const jobsRes = await api.get("/jobs");
        setJobs(jobsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    };
    fetchAdminData();
  }, []);

  const fetchApplications = async (jobId) => {
    // If applications for this job are already shown, hide them.
    if (applications[jobId]) {
      setApplications((prev) => {
        const newApps = { ...prev };
        delete newApps[jobId];
        return newApps;
      });
      return;
    }

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
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job._id} className="border-b pb-4">
                    <JobCard job={job} />
                    <button
                      onClick={() => fetchApplications(job._id)}
                      className="mt-2 text-sm text-blue-600 hover:underline">
                      {applications[job._id]
                        ? "Hide Applications"
                        : "View Applications"}
                    </button>
                    {applications[job._id] && (
                      <div className="mt-2 text-sm">
                        <h4 className="font-semibold">Applications:</h4>
                        {applications[job._id].length > 0 ? (
                          <ul>
                            {applications[job._id].map((app) => (
                              <li key={app._id} className="mt-1">
                                <span className="font-semibold">
                                  {app.applicant.name}
                                </span>{" "}
                                - {app.applicant.email}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No applications yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>You have not posted any jobs yet.</p>
              )}
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
