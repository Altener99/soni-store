import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi'; // Logout icon
import logo from './logo.webp';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [nav, setNav] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const handleNav = () => setNav(!nav);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/products?search=${searchQuery}`); // Redirect to products page with query parameter
    }

    if(searchQuery.trim() === '') {
      navigate('/products');
    }
  };

  const orders = () => {
    navigate('/orders');
  };

  const profile = () => {
    navigate('/profile');
  };

  // Toggle the dropdown for profile options
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className='fixed z-50 text-white font-bold flex justify-between items-center mx-auto bg-[#0078AD] px-12 h-24 w-full'>
      <Link className='h-full' to="/" ><img className='h-full w-[100px]' src={logo} alt="Logo" /></Link>

      {/* Search Bar */}
      <div className='relative w-[40%]'>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder='Search Here' 
            value={searchQuery} // Bind to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state
            className='w-full h-9 p-4 pl-4 pr-10 outline-none font-normal rounded-full text-black bg-[#E2F0F6] border border-[#009BD3] focus:border-[#0078AD] focus:bg-white transition duration-200' 
          />
          <button type="submit">
            <FaSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0078AD] text-xl cursor-pointer hover:text-[#005F87]' />
          </button>
        </form>
      </div>

      {/* Navigation Links */}
      <ul className='hidden md:flex'>
        <li className='p-4'><Link to="/">Home</Link></li>
        <li className='p-4'><Link to="/products">Products</Link></li>
        <li className='p-4'><Link to="/about">About</Link></li>
        
        {/* Conditional Sign In/Profile Icon */}
        <li className='p-4'>
          {isAuthenticated ? (
            <div className="relative">
              <FaUserCircle 
                size={24} 
                className="cursor-pointer" 
                onClick={toggleDropdown} 
              />
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg py-2">
                  <button onClick={profile} className='w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center'>
                    Profile
                  </button>
                  <button onClick={orders} className='w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center'>
                    Orders
                  </button>
                  <button 
                    onClick={logout} 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <BiLogOut size={18} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/SignIn" className="text-white">Sign In</Link>
          )}
        </li>

        <li className='p-4'><Link to="/Cart"><FaShoppingCart /></Link></li>
      </ul>

      {/* Hamburger Menu for Mobile */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>

      {/* Mobile Menu */}
      <div className={!nav ? 'fixed left-0 top-0 h-full w-[60%] border-r border-r-gray-900 bg-[#0068AD] ease-in-out duration-500 z-20' : 'fixed left-[-250%]'}>
        <img className='m-4 h-[10%] w-[33%]' src={logo} alt="Logo" />
        <ul className='p-4 uppercase'>
          <li className='p-4 border-b border-gray-600'><Link to="/">Home</Link></li>
          <li className='p-4 border-b border-gray-600'><Link to="/products">Products</Link></li>
          <li className='p-4 border-b border-gray-600'><Link to="/about">About</Link></li>
          <li className='p-4 border-b border-gray-600'>
            {isAuthenticated ? (
              <div>
                <button className='w-full text-left'>Profile</button>
                <button onClick={logout} className="w-full text-left">Logout</button>
              </div>
            ) : (
              <Link to="/SignIn">Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
