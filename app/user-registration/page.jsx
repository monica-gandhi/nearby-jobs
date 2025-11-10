'use client';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import RoleSelector from './components/RoleSelector';
import SocialRegistration from './components/SocialRegistration';
import NormalRegistration from './components/NormalRegistration';
import JobSeekerBasicDetails from './JobSeeker/JobSeekerBasicDetails';
import EmployerBasicDetails from './Employer/EmployerBasicDetails';
import EmailVerification from './components/EmailVerification';
import MobileVerification from './components/MobileVerification';
import ResumeUpload from './components/ResumeUpload';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider as googleProvider } from "@/common/config/firebase.config";
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { getDeviceInfo } from '@/common/utils/deviceInfo';
import { showError, showSuccess } from "@/common/toast/toastService";
import { useSelector } from 'react-redux';

export default function RegisterPage() {
  const [formData, setFormData] = useState({});
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
    if (socialType === "google") {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const token = await user.getIdToken();
        const uid = user.uid;
        const name = user.displayName;
        const email = user.email;

        const deviceInfo = await getDeviceInfo(token);

        const payload = {
          uid,
          name,
          email,
          roleId: selectedRoleId,
          deviceInfo,
        };

        console.log("Google Registration Payload:", payload);
        // const response = await apiRequest(apiRoutes.jobSeekerGoogleSignIn, 'POST', payload);
        // Choose API route based on role
        const apiUrl =
          role === 'jobseeker'
            ? apiRoutes.jobSeekerGoogleSignIn
            : apiRoutes.employerGoogleSignIn;

        const response = await apiRequest(apiUrl, 'POST', payload);

        if (response.status === 200 || response.data?.status) {
          showSuccess("Google Sign-In successful!");
          console.log("Backend Response:", response.data);
          setMethod("google");
          setStep(3);
          setSubStep(1);
        } else {
          showError(response.data?.message || "Registration failed!");
        }
      } catch (error) {
        console.error("Google Sign-In error:", error);
        showError("Google Sign-In failed, please try again.");
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
  const handleMobileVerified = () => setSubStep(4);

  const getTitle = () => {
    if (step === 1) return 'Create Your JobEazy Profile';
    if (step === 2) return 'Choose Registration Method';
    if (step === 3 && method === 'google' && subStep === 1) return 'Basic Details';
    if (step === 3 && method === 'google' && subStep === 2) return 'Verify Your Mobile';
    if (step === 3 && method === 'google' && subStep === 3) return 'Upload Resume';
    if (step === 3 && method === 'normal' && subStep === 1) return 'Verify Your Email';
    if (step === 3 && method === 'normal' && subStep === 2) return 'Basic Details';
    if (step === 3 && method === 'normal' && subStep === 3) return 'Verify Your Mobile';
    if (step === 4 && method === 'normal' && subStep === 4) return 'Upload Resume';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center py-10 px-6">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-6xl">
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
                      (role === 'applicant' ? (
                        <JobSeekerBasicDetails
                          onNext={() => setSubStep(2)}
                          onChange={(updatedData) => setFormData(updatedData)}
                          formData={formData}
                        />
                      ) : (
                        <EmployerBasicDetails onNext={() => setSubStep(2)} />
                      ))}
                    {subStep === 2 && <MobileVerification onVerified={handleMobileVerified} />}
                    {subStep === 3 && <ResumeUpload />}
                  </>
                )}

                {method === 'normal' && (
                  <>
                    {subStep === 1 && <EmailVerification onVerified={handleEmailVerified} />}
                    {subStep === 2 &&
                      (role === 'applicant' ? (
                        <JobSeekerBasicDetails onNext={handleBasicDetailsCompleted} />
                      ) : (
                        <EmployerBasicDetails onNext={handleBasicDetailsCompleted} />
                      ))}
                    {subStep === 3 && <MobileVerification onVerified={handleMobileVerified} />}
                    {subStep === 4 && <ResumeUpload />}
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
