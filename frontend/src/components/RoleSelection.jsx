import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // ✅ Firebase import

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === 'jobseeker') navigate('/jobseeker');
    else if (role === 'recruiter') navigate('/recruiter');
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/auth'); // 🔁 Redirect to auth page after logout
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold mb-6 text-blue-300">Select Your Role</h2>
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => handleSelect('jobseeker')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Job Seeker
        </button>
        <button
          onClick={() => handleSelect('recruiter')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Recruiter
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default RoleSelection;
