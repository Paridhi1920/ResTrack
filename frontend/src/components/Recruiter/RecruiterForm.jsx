import React, { useState } from 'react';
import './RecruiterForm.css';

const RecruiterForm = () => {
  const [jd, setJd] = useState('');
  const [resumes, setResumes] = useState([]);
  const [numCandidates, setNumCandidates] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('job_description', jd);
    formData.append('num_candidates', numCandidates);
    for (let i = 0; i < resumes.length; i++) {
      formData.append('resumes', resumes[i]);
    }

    const response = await fetch('http://localhost:5000/recruiter', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'shortlisted_resumes.zip');
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recruiter-form">
      <label>Job Description</label>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Enter Job Description"
        rows="6"
      />

      <label>Upload Resumes</label>
      <input
        type="file"
        multiple
        onChange={(e) => setResumes(e.target.files)}
      />

      <label>Number of Candidates</label>
      <input
        type="number"
        value={numCandidates}
        onChange={(e) => setNumCandidates(e.target.value)}
      />

      <button type="submit">Shortlist Candidates</button>
    </form>
  );
};

export default RecruiterForm;
