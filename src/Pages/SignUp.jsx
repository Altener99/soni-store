import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  axios.defaults.baseURL = 'https://soni-store-backend-fvgj.vercel.app';

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try
    {
      const response = await axios.post('/register', formData);
      console.log('Registration successful:', response.data);
      alert('Registration successful. Please sign in to continue.');
      navigate('/signin');    
    }
    catch (error)
    {
      console.error('Registration failed:',
      error);
    }

    
    // Handle form submission logic here (e.g., validation, API calls)

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        
        {/* Header */}
       <Link to="/" className='fixed'><BiArrowBack className="text-3xl text-[#0078AD] cursor-pointer"/></Link> 
        <h2 className="text-3xl font-semibold text-center text-[#0078AD]">Sign Up</h2>
        <p className="text-center text-gray-600">Create an account to get started!</p>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-gray-700">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 text-gray-500"><FaUser /></span>
              <input 
                type="text" 
                name="username" 
                className="w-full py-2 px-3 outline-none" 
                placeholder="Enter your name" 
                required 
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 text-gray-500"><FaEnvelope /></span>
              <input 
                type="email" 
                name="email" 
                className="w-full py-2 px-3 outline-none" 
                placeholder="Enter your email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 text-gray-500"><FaLock /></span>
              <input 
                type="password" 
                name="password" 
                className="w-full py-2 px-3 outline-none" 
                placeholder="Create a password" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 text-gray-500"><FaLock /></span>
              <input 
                type="password" 
                name="confirmPassword" 
                className="w-full py-2 px-3 outline-none" 
                placeholder="Confirm your password" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button 
            type="submit"
            className="w-full bg-[#0078AD] text-white font-semibold py-2 rounded-lg hover:bg-[#005c87] transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center text-gray-600">
          <p>Already have an account? 
            <Link to="/signin" className="text-[#0078AD] font-semibold hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
