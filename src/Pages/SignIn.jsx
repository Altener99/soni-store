import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  // Set base URL for axios
  axios.defaults.baseURL = 'https://soni-store-backend-fvgj.vercel.app';

  const { signIn } = useAuth();

  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password });
      console.log('Login successful:', response.data.token);
      signIn(response.data.token);
      navigate('/');

      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        
        {/* Header */}
        <Link to="/" className='fixed' ><BiArrowBack className="text-3xl text-[#0078AD] cursor-pointer"/></Link> 
        <h2 className="text-3xl font-semibold text-center text-[#0078AD]">Sign In</h2>
        <p className="text-center text-gray-600">Welcome back! Please enter your details to continue.</p>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 text-gray-500"><FaUser /></span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 outline-none" 
                placeholder="Enter your email" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-100 text-gray-500"><FaLock /></span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-3 outline-none" 
                placeholder="Enter your password" 
                required 
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit"
            className="w-full bg-[#0078AD] text-white font-semibold py-2 rounded-lg hover:bg-[#005c87] transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password and Sign Up Links */}
        <div className="text-center text-gray-600">
          <p>Forgot your password? <a href="/reset-password" className="text-[#0078AD] hover:underline">Reset it here</a>.</p>
          <p className="mt-4">
            Don’t have an account? 
            <Link to="/signup" className="text-[#0078AD] font-semibold hover:underline ml-1">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
