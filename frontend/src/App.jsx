import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import UploadForm from './components/JobSeeker/UploadForm';
import RecruiterForm from './components/Recruiter/RecruiterForm';
import AuthForm from './components/AuthForm';
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("Current Firebase user:", currentUser); 
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <RoleSelection /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthForm />} /> {/* 👈 Added redirect for logged-in users */}
        <Route path="/jobseeker" element={user ? <UploadForm /> : <Navigate to="/auth" />} />
        <Route path="/recruiter" element={user ? <RecruiterForm /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
