'use client';
import React, { useState } from 'react';
import Button from '@/components/shared/button/page';
export default function EmailVerification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);

    const handleChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleVerify = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500); // fake loading just for design demo
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl">

                {/* Left Illustration */}
                <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-100 to-sky-50 items-center justify-center p-10">
                    <img
                        src="/assets/images/email-otp.png"
                        alt="Email Verification"
                        className="w-4/4 h-auto drop-shadow-md"
                    />
                </div>

                {/* Right Section */}
                <div className="flex-1 p-10 flex flex-col justify-start">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Verify your Email Address
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed mt-10">
                        A 6-digit verification code has been sent to your email.
                        <br /> Please enter the code below to continue.
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
                                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition-all shadow-sm"
                                />
                            ))}
                        </div>

                        {/* ✅ Using your custom Button */}
                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            fullWidth
                            loading={loading}
                            className="mt-4"
                        >
                            {loading ? 'Verifying...' : 'Verify & Continue'}
                        </Button>

                        {/* Resend Section */}
                        <p className="text-sm text-gray-500 text-center mt-4">
                            Didn’t receive the code?{' '}
                            <button
                                type="button"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Resend
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
