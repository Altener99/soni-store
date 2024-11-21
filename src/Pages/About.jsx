import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutContent from '../components/AboutContent';

function About() {
  
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main About Section */}
      <AboutContent/>
    
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
