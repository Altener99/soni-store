import React, { useState } from 'react';
import { FaUsers, FaBullseye, FaRegHandshake, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import image from './image.png';
import store from './sonistore1.jpg';

function AboutContent() {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => setShowMore(!showMore);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800 pt-36">
      
      {/* Main Heading */}
      <motion.h1 
        className="text-5xl font-bold text-center text-[#0078AD]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        About Us
      </motion.h1>

      <div className="max-w-6xl mx-auto mt-12 px-8 md:px-16">

        {/* Who We Are Section */}
        <motion.section
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full md:w-1/3">
            <img
              src={image}
              alt="Who We Are Left"
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          <FaUsers className="text-[#0078AD] text-6xl" />
          <div>
            <h2 className="text-3xl font-semibold text-[#0078AD] mb-4">Who We Are</h2>
            <p className="text-lg leading-relaxed">
              We are a dedicated team with a passion for delivering top-quality products to our customers. With a strong focus on excellence, we aim to make every interaction valuable and every experience memorable.
            </p>
            
          </div>
          <div className="w-full md:w-1/3">
            <img
              src={store}
              alt="Who We Are Left"
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <FaBullseye className="text-[#0078AD] text-6xl" />
          <div>
            <h2 className="text-3xl font-semibold text-[#0078AD] mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Our mission is to provide exceptional quality products and experiences at affordable prices. We’re here to meet your daily needs with authenticity, integrity, and unmatched customer care.
            </p>
          </div>
        </motion.section>

        {/* Core Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-[#0078AD] mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaRegHandshake />, title: 'Trust', description: 'Building trust through transparency and honesty.' },
              { icon: <FaUsers />, title: 'Customer First', description: 'Prioritizing our customers\' needs and feedback.' },
              { icon: <FaBullseye />, title: 'Excellence', description: 'Striving for perfection in every detail.' },
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 * index }}
              >
                <div className="text-[#0078AD] text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-[#0078AD] mb-8">Meet Our Team</h2>
          <div className="text-lg leading-relaxed text-center">
            Our team works tirelessly to bring you the best shopping experience, focusing on product quality, customer satisfaction, and innovation.
          </div>
        </section>

        {/* Show More Section */}
        <section className="text-center mb-16">
          <button 
            onClick={handleShowMore}
            className="bg-[#0078AD] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#005c87] transition duration-200"
          >
            {showMore ? "Show Less" : "Learn More"}
          </button>
          {showMore && (
            <motion.div 
              className="mt-8 text-lg leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>Our grocery store is committed to sustainable sourcing, partnering with local suppliers and farmers to bring fresh, organic products directly to you. From daily essentials to unique finds, our curated selection caters to diverse tastes and needs.</p>
              <p className="mt-4">We aim to foster a community of health-conscious shoppers who value quality, affordability, and customer care. Your journey with us is just beginning—experience the difference today!</p>
            </motion.div>
          )}
        </section>

        {/* Google Maps Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-[#0078AD] mb-8">Our Location</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            {/* <iframe
              className="w-full h-72 md:h-96"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086166!2d144.95373631561656!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sVictoria%2C%20Australia!5e0!3m2!1sen!2sus!4v1615895832060!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe> */}
            <iframe className='w-full h-72 md:h-96' title='Soni Super Store' src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d427.21161067668646!2d76.3026878503736!3d31.062648148196637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDAzJzQ1LjkiTiA3NsKwMTgnMTAuNyJF!5e0!3m2!1sen!2sin!4v1731466062068!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-[#0078AD] mb-8">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaPhoneAlt className="text-[#0078AD] text-3xl mb-2" />
              <p className="text-lg font-semibold">Phone</p>
              <p className="text-gray-700">+91 97880 00091</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-[#0078AD] text-3xl mb-2" />
              <p className="text-lg font-semibold">Email</p>
              <p className="text-gray-700">rohitsoni295@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-[#0078AD] text-3xl mb-2" />
              <p className="text-lg font-semibold">Address</p>
              <p className="text-gray-700">bhaddi road, balachaur, punjab ,INDIA</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutContent;
