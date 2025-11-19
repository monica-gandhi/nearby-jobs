'use client';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import RoleSelector from './components/RoleSelector';
import SocialRegistration from './components/SocialRegistration';
import NormalRegistration from './components/NormalRegistration';
import JobSeekerBasicDetails from './JobSeeker/JobSeekerBasicDetails';
import EmployerBasicDetails from './Employer/EmployerBasicDetails';
import EmailVerification from './components/EmailVerification';
import MobileVerification from './components/MobileVerification';
import ResumeUpload from './components/ResumeUpload';
import ProfileUpload from './components/ProfileUploadForm';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider as googleProvider } from "@/common/config/firebase.config";
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { getDeviceInfo } from '@/common/utils/deviceInfo';
import { showError, showSuccess } from "@/common/toast/toastService";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/common/store/auth/authSlice";


export default function RegisterPage() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [method, setMethod] = useState('');
  const [subStep, setSubStep] = useState(1);

  const { roles, selectedRoleId } = useSelector((state) => state.role);

  // ----------- STEP HANDLERS ------------
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSocialRegister = async (socialType) => {
    if (isSigningIn) return; // ⛔ Prevent double popups
    setIsSigningIn(true);
    if (socialType === "google") {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // 🔑 Get Google ID token (Firebase)
        const token = await user.getIdToken();
        const uid = user.uid;
        const name = user.displayName;
        const email = user.email;

        // 📱 Get device info
        const deviceInfo = await getDeviceInfo(token);

        // 🧾 Prepare payload
        const payload = {
          uid,
          name,
          email,
          roleId: selectedRoleId,
          deviceInfo,
        };

        console.log("Google Registration Payload:", payload);

        // 🌐 Choose API based on role
        const apiUrl =
          role === "jobseeker"
            ? apiRoutes.jobSeekerGoogleSignIn
            : apiRoutes.employerGoogleSignIn;

        // 🚀 Send registration request
        const response = await apiRequest(apiUrl, "POST", payload);

        console.log("Google Registration Response:", response);

        if (response.status === 200 || response.data?.status) {
          showSuccess("Google Sign-In successful!");

          // ✅ Extract token from backend response
          const returnedToken =
            response?.data?.token ||
            response?.token ||
            response?.data?.data?.token ||
            null;

          if (returnedToken) {
            localStorage.setItem("authToken", returnedToken);
            dispatch(loginSuccess({ token: returnedToken, user: { email } }));
            console.log("Auth token saved:", returnedToken);
          } else {
            console.warn("⚠️ No token returned from backend.");
          }

          // ✅ Extract jobseekerId from backend response
          const jobseekerId =
            response?.data?.id ||
            response?.data?.data?.id ||
            response?.id ||
            response?.data?.jobseekerId ||
            null;

          if (jobseekerId) {
            localStorage.setItem("jobseekerId", jobseekerId);
            console.log("Jobseeker ID saved:", jobseekerId);
          } else {
            console.warn("⚠️ No jobseekerId returned from backend.");
          }

          // ✅ Proceed to next step (Resume upload)
          setMethod("google");
          setStep(3);
          setSubStep(1);
        } else {
          showError(response.data?.message || "Registration failed!");
        }
      } catch (error) {
        console.error("Google Sign-In error:", error);
        showError("Google Sign-In failed, please try again.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };


  const handleNormalRegister = () => {
    setMethod('normal');
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setRole('');
      setStep(1);
    } else if (step === 3 && method === 'google') {
      setMethod('');
      setStep(2);
    } else if (step === 3 && method === 'normal') {
      if (subStep > 1) setSubStep(subStep - 1);
      else {
        setMethod('');
        setStep(2);
      }
    }
  };

  const handleEmailVerified = () => setSubStep(2);
  const handleBasicDetailsCompleted = () => setSubStep(3);
  const handleMobileVerified = () => {
    if (method === 'google') setSubStep(3);
    else setSubStep(4);
  };
  const getTitle = () => {
    if (step === 1) return 'Create Your JobEazy Profile';
    if (step === 2) return 'Choose Registration Method';

    if (step === 3 && method === 'google') {
      if (subStep === 1) return 'Basic Details';
      if (subStep === 2) return 'Verify Your Mobile';
      if (subStep === 3) return 'Upload Resume';
      if (subStep === 4) return 'Upload Profile Picture';
    }

    if (step === 3 && method === 'normal') {
      if (subStep === 1) return 'Verify Your Email';
      if (subStep === 2) return 'Basic Details';
      if (subStep === 3) return 'Verify Your Mobile';
      if (subStep === 4) return 'Upload Resume';
      if (subStep === 5) return 'Upload Profile Picture';
    }

    return '';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center py-10 px-6">
      <Header isAuthenticated={false} />

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-6xl mt-10">
        {/* ---------------- LEFT CARD ---------------- */}
        <div className="w-full lg:w-[28%] bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-gray-700">
          <Image
            src="/assets/images/register-illustration.png"
            alt="Register Illustration"
            width={180}
            height={180}
            className="mb-6"
          />
          <h2 className="text-lg font-semibold mb-3 text-orange-600 text-center">
            On registering, you can
          </h2>
          <ul className="space-y-3 text-gray-600 text-sm text-left">
            <li>✅ Build. Apply. Succeed.</li>
            <li>✅ Smart matches, real jobs</li>
            <li>✅ Your career starts here</li>
          </ul>
        </div>

        {/* ---------------- RIGHT CARD ---------------- */}
        <div className="w-full lg:w-[68%] bg-white rounded-xl shadow-md px-10 pt-16 pb-10 relative">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="absolute top-5 left-6 flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
          )}

          <h2 className="text-xl font-bold text-gray-800 mb-10">{getTitle()}</h2>

          <div className="w-full max-w-2xl mx-auto mb-12">
            {step === 1 && <RoleSelector onRoleSelect={handleRoleSelect} />}

            {step === 2 && (
              <div className="space-y-6">
                <SocialRegistration onSocialRegister={handleSocialRegister} />
                <NormalRegistration onNext={handleNormalRegister} />
              </div>
            )}

            {step === 3 && (
              <>
                {method === 'google' && (
                  <>
                    {subStep === 1 &&
                      (role === 'jobseeker' ? (
                        <JobSeekerBasicDetails
                          onNext={() => setSubStep(2)}
                          onChange={(updatedData) => setFormData(updatedData)}
                          formData={formData}
                        />
                      ) : (
                        <EmployerBasicDetails onNext={() => setSubStep(2)} />
                      ))}
                    {subStep === 2 && <MobileVerification onVerified={handleMobileVerified} />}
                    {subStep === 3 && (
                      <ResumeUpload
                        onNext={() => setSubStep(4)}
                        onSkip={() => setSubStep(4)}
                      />
                    )}
                    {subStep === 4 && <ProfileUpload />}

                  </>
                )}

                {method === 'normal' && (
                  <>
                    {subStep === 1 && <EmailVerification onVerified={handleEmailVerified} />}
                    {subStep === 2 &&
                      (role === 'jobseeker' ? (
                        <JobSeekerBasicDetails onNext={handleBasicDetailsCompleted} />
                      ) : (
                        <EmployerBasicDetails onNext={handleBasicDetailsCompleted} />
                      ))}
                    {subStep === 3 && <MobileVerification onVerified={handleMobileVerified} />}
                    {subStep === 4 && (
                      <ResumeUpload
                        onNext={() => setSubStep(5)}
                        onSkip={() => setSubStep(5)}
                      />
                    )}
                    {subStep === 5 && <ProfileUpload />}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
