import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === 'jobseeker') navigate('/jobseeker');
    else if (role === 'recruiter') navigate('/recruiter');
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 rounded-full opacity-30 animate-pulse blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600 rounded-full opacity-30 animate-ping blur-2xl"></div>

      <h2 className="text-4xl font-bold mb-10 z-10 animate-fade-in">
        👋 Choose Your Role
      </h2>

      <div className="flex flex-col sm:flex-row gap-10 z-10">
        {/* Job Seeker Card */}
        <div
          onClick={() => handleSelect('jobseeker')}
          className="w-64 h-40 bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center text-xl font-semibold"
        >
          🚀 Job Seeker
        </div>

        {/* Recruiter Card */}
        <div
          onClick={() => handleSelect('recruiter')}
          className="w-64 h-40 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center text-xl font-semibold"
        >
          🧑‍💼 Recruiter
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-12 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium shadow-lg transition duration-300 z-10"
      >
        🔓 Logout
      </button>
    </div>
  );
};

export default RoleSelection;
