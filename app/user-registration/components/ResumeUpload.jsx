"use client";
import { useState } from "react";
import { apiRequest } from "@/common/api/apiService";
import apiRoutes from "@/common/constants/apiRoutes";
import ResumeFileCard from "@/components/shared/resume/page";
import { showSuccess,showError } from "@/common/toast/toastService";
export default function ResumeUpload({ onSkip, onNext }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReplace = (newFile) => {
    setFile(newFile);
  };

  const handleDelete = () => {
    setFile(null);
  };

  const handleSkip = () => {
    showSuccess("You skipped this step successfully");
    onSkip?.();
  };

  const handleUpload = async () => {
    if (!file) {
      showError("Please select a file before uploading.");
      return;
    }

    setLoading(true);
    try {
      const jobseekerId = localStorage.getItem("jobseekerId");
      const token = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("id", jobseekerId);
      formData.append("file", file);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await apiRequest(
        apiRoutes.jobSeekerResumeUpload,
        "POST",
        formData,
        headers
      );

      const ok =
        response?.response === true ||
        response?.success ||
        response?.status === 200;

      if (ok) {
        showSuccess("Resume uploaded successfully!");
        onNext?.();
      } else {
        showError(response?.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      showError("Error during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-6">
      <p className="text-gray-700 font-medium text-lg">Upload your Resume</p>

      {!file ? (
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full max-w-md"
        />
      ) : (
        <ResumeFileCard
          fileName={file?.name}
          fileSize={Math.round(file.size / 1024)}
          updatedDate={new Date().toLocaleDateString("en-GB")}
          onReplace={handleReplace}
          onDelete={handleDelete}
        />
      )}

      <div className="flex gap-4">
        <button
          onClick={handleSkip}
          className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Skip
        </button>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`px-6 py-2 rounded text-white ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

