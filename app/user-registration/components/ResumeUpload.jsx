'use client';
import { useState } from 'react';

export default function ResumeUpload({ onSkip, onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert('Please select a file to upload.');
    onUpload(file);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-gray-700 mb-2">Upload your resume (PDF, DOC, DOCX)</p>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="border p-2 rounded w-full max-w-md"
      />
      {file && <p className="text-sm text-gray-600">Selected file: {file.name}</p>}
      <div className="flex gap-4">
        <button
          onClick={onSkip}
          className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100 transition"
        >
          Skip
        </button>
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
