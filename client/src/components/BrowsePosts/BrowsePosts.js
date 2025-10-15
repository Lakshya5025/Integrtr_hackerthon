import React, { useState } from 'react';
import './BrowsePosts.css';

// Sample data for NGOs. In a real app, you would fetch this from a server.
const initialNgos = [
  {
    id: 1,
    name: 'Teach for Tomorrow',
    type: 'Education',
    location: 'Mumbai',
    description: 'Providing quality education to underprivileged children across the city.',
  },
  {
    id: 2,
    name: 'Green Planet Foundation',
    type: 'Environment',
    location: 'Delhi',
    description: 'Working on reforestation projects and promoting sustainable living.',
  },
  {
    id: 3,
    name: 'HealthBridge India',
    type: 'Healthcare',
    location: 'Bangalore',
    description: 'Organizing free medical camps and health awareness programs in rural areas.',
  },
  {
    id: 4,
    name: 'Animal Angels',
    type: 'Animal Welfare',
    location: 'Pune',
    description: 'Rescuing and rehabilitating stray animals, and facilitating adoptions.',
  },
];

const BrowseNGOs = () => {
  // State to hold the values from the search inputs
  const [ngoType, setNgoType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  
  // State to hold the list of NGOs to display
  const [ngos, setNgos] = useState(initialNgos);

  // Function to handle the search button click
  const handleSearch = () => {
    console.log('Searching for:', { ngoType, keyword, location });
    // In a real application, you would use these state values
    // to filter the 'ngos' array or make an API call to your backend.
    alert(`Searching for:\nType: ${ngoType}\nKeyword: ${keyword}\nLocation: ${location}`);
  };

  return (
    <div className="browse-ngos-container">
      <h1>Browse NGOs</h1>

      {/* Search Section */}
      <div className="search-bar">
        <select value={ngoType} onChange={(e) => setNgoType(e.target.value)}>
          <option value="">Organisation Type</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Animal Welfare">Animal Welfare</option>
        </select>
          <input
            type="text"
            placeholder="Enter organisation"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* NGO List Section */}
      <div className="ngo-list">
        {ngos.map((ngo) => (
          <div key={ngo.id} className="ngo-card">
            <h3>{ngo.name}</h3>
            <p className="ngo-type">{ngo.type}</p>
            <p className="ngo-location">📍 {ngo.location}</p>
            <p className="ngo-description">{ngo.description}</p>
            <button className="details-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePosts;