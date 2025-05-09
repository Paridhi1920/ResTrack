import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const jobRoles = Array.isArray(result.Job_Roles) ? result.Job_Roles : [];

  const handleCopy = () => {
    navigator.clipboard.writeText(result.Cover_Letter);
    alert("Cover letter copied to clipboard!");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result.Cover_Letter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "cover_letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="mt-6 bg-blue-900 p-5 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-semibold mb-3 text-white">📊 Results:</h2>

      <p><strong>ATS Score:</strong> {result.ATS_Score}%</p>

      <p className="mt-4"><strong>📄 Suggested Cover Letter:</strong></p>
      <div className="bg-blue-800 p-4 rounded-md mt-2">
        <pre className="whitespace-pre-wrap text-sm text-white">{result.Cover_Letter}</pre>
        <div className="flex gap-4 mt-3">
          <button
            onClick={handleCopy}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 text-sm"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 text-sm"
          >
            Download as .txt
          </button>
        </div>
      </div>

      <h3 className="mt-5 font-semibold text-white">🔍 Suggested Job Roles:</h3>
      <ul className="list-disc ml-5 text-sm mt-2">
        {jobRoles.length > 0 ? (
          jobRoles.map((job, i) => {
            if (typeof job === 'string') {
              return <li key={i}>{job}</li>;
            } else if (job?.title && job?.company && job?.link) {
              return (
                <li key={i}>
                  <a href={job.link} className="text-blue-300 underline" target="_blank" rel="noreferrer">
                    {job.title} at {job.company} ({job.location || 'Remote'})
                  </a>
                </li>
              );
            } else {
              return <li key={i}>Invalid job entry</li>;
            }
          })
        ) : (
          <li>No job roles found.</li>
        )}
      </ul>
    </div>
  );
};

export default ResultCard;
