import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';

const UploadForm = () => {
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please select a resume file!");
      return;
    }

    // Optional: Client-side file type validation
    if (
      resume &&
      ![
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(resume.type)
    ) {
      alert("Only PDF or DOCX files are allowed.");
      return;
    }

    console.log("Uploading file:", resume);  // Debug line to check if file is attached

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const res = await axios.post('http://localhost:5000/upload-resume', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);  // Check the response from the backend
      setResult(res.data);
    } catch (err) {
      console.error("Error while uploading resume:", err);
      // Check if response contains more detailed error
      const errorMsg = err.response && err.response.data ? err.response.data.details : "There was an error uploading your resume. Please try again.";
      setError(errorMsg);  // Display detailed error from the backend
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">AI Resume Analyzer</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && <ResultCard result={result} />}
    </div>
  );
};

export default UploadForm;
