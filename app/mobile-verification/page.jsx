'use client';

import React, { useState } from 'react';
import Button from '@/components/shared/button/page';
import { motion } from 'framer-motion';

export default function MobileVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (idx, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (value && idx < otp.length - 1) {
        document.getElementById(`otp-${idx + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`).focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Mobile number verified successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-emerald-100 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center"
      >
        {/* Icon / Illustration */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full shadow-inner">
            <img
              src="/assets/images/mobile-verify.png"
              alt="Verify Mobile"
              className="w-20 h-20"
            />
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Mobile Number Verification
        </h2>
        <p className="text-gray-600 mb-8">
          Enter the 6-digit code we’ve sent to your mobile number to verify your account.
        </p>

        {/* OTP Input Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
          className="space-y-6"
        >
          <div className="flex justify-between gap-2 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                disabled={loading}
                className="w-12 h-12 text-center text-lg font-semibold border border-emerald-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            variant="success"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-4 shadow-lg hover:shadow-emerald-200"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </Button>

          {/* Resend Section */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Didn’t get the code?{' '}
            <button
              type="button"
              className="text-emerald-600 font-medium hover:underline"
            >
              Resend Code
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
