// src/components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
      <p className="text-gray-700 font-semibold mt-1">{job.ngo.name}</p>
      <p className="text-gray-600 mt-2">📍 {job.location}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          {job.jobType}
        </span>
        <Link
          to={`/jobs/${job._id}`}
          className="text-blue-600 hover:underline font-semibold">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
