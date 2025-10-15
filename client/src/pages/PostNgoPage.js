// src/pages/PostNgoPage.js
import React, { useState } from 'react';

const PostNgoPage = () => {
  const [ngoName, setNgoName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ ngoName, description, city });
    alert('NGO submitted! (Check console for data)');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Post a New NGO</h2>
        <div className="form-group">
          <label htmlFor="ngoName">NGO Name</label>
          <input
            type="text"
            id="ngoName"
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Submit NGO</button>
      </form>
    </div>
  );
};

export default PostNgoPage;