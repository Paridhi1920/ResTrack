import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold">ResTrack</div>
      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-blue-300 transition">Home</Link>
        <Link to="/about" className="hover:text-blue-300 transition">About</Link>
        <Link to="/auth" className="hover:text-blue-300 transition">Login / Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
