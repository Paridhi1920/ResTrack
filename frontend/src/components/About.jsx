import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-950 text-white px-6 py-12 flex flex-col items-center">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About ResTrack
        </motion.h1>

        <motion.p
          className="max-w-3xl text-lg text-center leading-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <span className="font-semibold text-blue-300">ResTrack</span> is an AI-powered platform designed to simplify your job search and recruitment process. Whether you're a
          job seeker looking for personalized opportunities or a recruiter trying to shortlist the best candidates,
          ResTrack offers:
        </motion.p>

        <motion.ul
          className="mt-8 list-disc max-w-2xl text-left space-y-4 pl-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <li><span className="text-blue-400 font-semibold">Resume Analysis:</span> Get your resume evaluated and scored using ATS algorithms.</li>
          <li><span className="text-blue-400 font-semibold">Cover Letter Generator:</span> Instantly generate tailored cover letters.</li>
          <li><span className="text-blue-400 font-semibold">Job Suggestions:</span> Receive job recommendations based on your resume.</li>
          <li><span className="text-blue-400 font-semibold">Recruiter Tools:</span> Upload job descriptions and resumes to get the top candidates automatically.</li>
        </motion.ul>

        <motion.p
          className="mt-12 text-center text-blue-300 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Engineered with ❤ to shape the future of hiring
        </motion.p>
      </div>
    </>
  );
};

export default About;
