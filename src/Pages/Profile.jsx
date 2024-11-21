import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState({});

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://soni-store-backend-fvgj.vercel.app/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const username = userData.username;
      const email = userData.email;
      const response = await axios.put('https://soni-store-backend-fvgj.vercel.app/profile',{username, email}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-36 px-6">
        {/* Profile Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Profile</h1>
        <p className="text-gray-600 mb-8">View and update your personal information below.</p>

        {/* Profile Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-600 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing ? 'bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500' : 'bg-gray-200'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing ? 'bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500' : 'bg-gray-200'
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-600 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing ? 'bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500' : 'bg-gray-200'
                  }`}
                />
              </div>

              {/* Address */}
         
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 mr-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
