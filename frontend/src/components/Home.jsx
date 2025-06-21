// src/components/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Welcome to ResTrack
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg sm:text-xl max-w-2xl"
        >
          Your all-in-one platform for resume analysis, job recommendations, and recruiter automation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8"
        >
          <a
            href="/auth"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-100 transition"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;
