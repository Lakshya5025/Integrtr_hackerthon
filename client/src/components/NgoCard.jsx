// src/components/NgoCard.jsx
import React from "react";

const NgoCard = ({ ngo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800">{ngo.name}</h3>
      <p className="text-gray-600 mt-2">📍 {ngo.location}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {ngo.causes.map((cause) => (
          <span
            key={cause}
            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {cause}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NgoCard;
