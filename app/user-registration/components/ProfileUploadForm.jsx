'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { useDispatch } from 'react-redux';
import { setSelectedRoleId } from '@/common/store/slices/roleSlice';

export default function ProfileUpload({ onNext }) {
  const [file, setFile] = useState(null);
  const [expectedSalary, setExpectedSalary] = useState('');
  const [experience, setExperience] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const jobseekerId = typeof window !== "undefined" ? localStorage.getItem("jobseekerId") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  // -----------------------------
  // SAVE all data + upload image
  // -----------------------------
  const handleSaveAndContinue = async () => {
    if (!expectedSalary || !experience) {
      alert("Please fill both Expected Salary & Experience");
      return;
    }

    setLoading(true);

    try {
      let imageUploaded = false;

      // ---- 1️⃣ Upload image if selected ----
      if (file) {
        const formData = new FormData();
        formData.append("id", jobseekerId);
        formData.append("file", file);

        const imgRes = await apiRequest(
          apiRoutes.jobSeekerProfileImageUpdate,
          "POST",
          formData,
          headers
        );

        if (
          imgRes?.status === 200 ||
          imgRes?.data?.status ||
          imgRes?.response === true
        ) {
          imageUploaded = true;
        } else {
          alert("Image upload failed!");
        }
      }

      // ---- 2️⃣ Update fields ----
      const payload = {
        id: jobseekerId,
        expectedSalary,
        experience,
        steps: {
          step1: true,
          step2: true,
          step3: true,
          step4: true,
          step5: true,
          step6: true,
        },
      };

      const updateRes = await apiRequest(
        apiRoutes.jobSeekerUpdate,
        "POST",
        payload,
        headers
      );

      if (updateRes?.response === true) {
        setMessage("✅ Saved Successfully!");

        dispatch(setSelectedRoleId(null));
        localStorage.removeItem("selectedRoleId");

        // Redirect or next step
        setTimeout(() => {
          if (onNext) onNext();
          router.push("/jobseeker/dashboard");
        }, 800);
      } else {
        alert("Failed to save details!");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // SKIP entire step
  // -----------------------------
  const handleSkip = async () => {
    setLoading(true);

    try {
      const payload = {
        id: jobseekerId,
        steps: {
          step1: true,
          step2: true,
          step3: true,
          step4: true,
          step5: true,
          step6: true,
        },
      };

      const res = await apiRequest(apiRoutes.jobSeekerUpdate, "POST", payload, headers);

      if (res?.response === true) {
        setMessage("⏭️ Step skipped");

        setTimeout(() => {
          if (onNext) onNext();
        }, 500);
      }
    } catch (err) {
      console.error("Skip error:", err);
      alert("Failed to skip step");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">

      {/* Expected Salary */}
      <div className="w-full max-w-md">
        <label className="block mb-1 text-gray-700">Expected Salary</label>
        <input
          type="number"
          value={expectedSalary}
          onChange={(e) => setExpectedSalary(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter expected salary"
        />
      </div>

      {/* Experience */}
      <div className="w-full max-w-md">
        <label className="block mb-1 text-gray-700">Experience (in years)</label>
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter your experience"
        />
      </div>

      {/* Image Upload */}
      <p className="text-gray-700">Upload your profile photo (optional)</p>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="border p-2 rounded w-full max-w-md"
      />

      {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}

      {message && <p className="text-green-600 text-sm">{message}</p>}

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSkip}
          disabled={loading}
          className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100"
        >
          Skip
        </button>

        <button
          onClick={handleSaveAndContinue}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
