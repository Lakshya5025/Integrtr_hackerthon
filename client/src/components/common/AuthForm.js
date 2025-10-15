// src/components/common/AuthForm.js
import React, { useState } from 'react';

const AuthForm = ({ role, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    mobile: '',
    city: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    // ... (validation logic is correct and remains the same)
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (mode === 'signup') {
      if (!formData.name) newErrors.name = 'Name is required';
      
      if (role === 'admin') {
        if (!formData.username) newErrors.username = 'Username is required';
        else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
      }
      
      if (role === 'user') {
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        if (!formData.city) newErrors.city = 'City is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid. Submitting:', formData);
      alert(`Successful ${mode} for ${role}!`);
    } else {
      console.log('Form validation failed.');
    }
  };

  // --- FIX: Create clear variables for the title ---
  const formActionText = mode === 'login' ? 'Login' : 'Register';
  const roleText = role === 'user' ? 'as a Volunteer' : 'as an Admin';

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Use the new variables to build the title */}
      <h3>{formActionText} {roleText}</h3>
      
      {/* --- All the form fields below are correct and remain the same --- */}
      
      {mode === 'signup' && (
        <div className="form-group">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
      )}

      {mode === 'signup' && role === 'admin' && (
        <div className="form-group">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>
      )}

      {mode === 'signup' && role === 'user' && (
        <>
          <div className="form-group">
            <input type="tel" name="mobile" placeholder="Mobile No." value={formData.mobile} onChange={handleChange} />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
          </div>
          <div className="form-group">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>
        </>
      )}

      <div className="form-group">
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>

      <button type="submit" className="submit-button">
        {mode === 'login' ? 'Login' : 'Create Account'}
      </button>
    </form>
  );
};

export default AuthForm;