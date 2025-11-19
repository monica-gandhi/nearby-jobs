'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showSuccess,showError } from '@/common/toast/toastService';
export default function MobileVerification({ onVerified }) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Load stored mobile if exists
  useEffect(() => {
    const storedMobile = localStorage.getItem('mobile');
    if (storedMobile) setMobile(storedMobile.replace(/^\+91/, ''));
  }, []);

  // Send OTP API
  const handleSendOtp = async () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const extraHeaders = token ? { Authorization: `Bearer ${token}` } : null;

      const response = await apiRequest(
        apiRoutes.jobSeekerMobileOtp,
        'POST',
        { mobile: `+91${mobile}` },
        extraHeaders
      );

      if (response?.response === true || response?.success || response?.status === 200) {
        localStorage.setItem('mobile', mobile);
        setSuccess('Please click verify OTP button to continue.');
        setIsSent(true);

        // Auto-fill OTP for testing if backend returns one
        const returnedOtp = response?.data?.otp || response?.otp || response?.data?.data?.otp;
        if (returnedOtp) setOtp(String(returnedOtp));
      } else {
        setError(response?.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error sending OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP API
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      showError('Please enter a valid 6-digit OTP');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const extraHeaders = token ? { Authorization: `Bearer ${token}` } : null;

      const response = await apiRequest(
        apiRoutes.jobSeekerMobileVerify,
        'POST',
        {
          mobile: `+91${mobile}`,
          mobileOtp: otp,
          id: localStorage.getItem('jobseekerId') || undefined,
        },
        extraHeaders
      );

      const ok =
        response?.response === true ||
        response?.success ||
        response?.status === 200 ||
        response?.data?.status;

      if (ok) {
        showSuccess(response?.message || 'Mobile number verified successfully!');
        if (typeof onVerified === 'function') onVerified(mobile);
      } else {
        const msg = response?.message || 'Invalid OTP. Please try again.';
        showError(msg);
        setError(msg); // optional UI error under input
      }
    } catch (err) {
      console.error(err);
      showError('Error verifying OTP. Please try again.');
      setError('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
        disabled={isSent} // disable once OTP sent
      />

      {isSent && (
        <Input
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="6-digit OTP"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      {!isSent ? (
        <Button fullWidth onClick={handleSendOtp} disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </Button>
      ) : (
        <Button fullWidth onClick={handleVerifyOtp} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Mobile'}
        </Button>
      )}
    </div>
  );
}
