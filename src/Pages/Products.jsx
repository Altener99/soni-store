import React from 'react';
import Navbar from '../components/Navbar';
import Items from '../components/Items';
import Footer from '../components/Footer';

function Products() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <Items/>
      <Footer/>
    </div>
  );
}

export default Products;
