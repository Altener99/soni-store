import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-amber-200 text-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-amber-900">SoniSuperStore</h2>
            <p className="mt-2 text-gray-700">Your one-stop shop for all your daily needs. Fresh, affordable, and quality products delivered to your doorstep.</p>
          </div>
          
          {/* Links */}
          <div className="flex gap-8 mb-6 md:mb-0">
            <ul>
              <li className="font-semibold text-gray-800">Quick Links</li>
              <li><a href="#home" className="hover:text-amber-600">Home</a></li>
              <li><a href="#products" className="hover:text-amber-600">Products</a></li>
              <li><a href="#about" className="hover:text-amber-600">About Us</a></li>
              <li><a href="#contact" className="hover:text-amber-600">Contact</a></li>
            </ul>
            <ul>
              <li className="font-semibold text-gray-800">Categories</li>
              <li><a href="#daily-needs" className="hover:text-amber-600">Daily Needs</a></li>
              <li><a href="#snacks" className="hover:text-amber-600">Snacks</a></li>
              <li><a href="#cooking" className="hover:text-amber-600">Cooking</a></li>
              <li><a href="#wellness" className="hover:text-amber-600">Wellness</a></li>
            </ul>
          </div>
          
          {/* Social Media Links */}
          <div className="flex gap-4 text-2xl text-gray-600">
            <a href="#" className="hover:text-amber-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-amber-600"><FaTwitter /></a>
            <a href="#" className="hover:text-amber-600"><FaInstagram /></a>
            <a href="#" className="hover:text-amber-600"><FaLinkedinIn /></a>
          </div>
        </div>
        
        {/* Bottom Line */}
        <div className="text-center text-gray-600 mt-8">
          <p>&copy; 2024 SoniSuperStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
