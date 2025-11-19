'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
export default function EmailVerification({ onVerified }) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Load stored email if exists
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    // Send OTP API
    const handleSendOtp = async () => {
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            const extraHeaders = token ? { Authorization: `Bearer ${token}` } : null;

            const response = await apiRequest(
                apiRoutes.jobSeekerEmailOtp,
                'POST',
                { email },
                extraHeaders
            );

            if (response?.response === true || response?.success) {
                localStorage.setItem('email', email);
                setSuccess('OTP sent successfully! Please check your email.');
                setIsSent(true);
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
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            const extraHeaders = token ? { Authorization: `Bearer ${token}` } : null;

            const response = await apiRequest(
                apiRoutes.jobSeekerEmailVerify,
                'POST',
                { email, emailOtp: otp },
                extraHeaders
            );

            if (response?.response === true || response?.success) {

                // ⭐ Show the exact message coming from backend
                showSuccess(response?.message || 'Email verified successfully!');

                onVerified(email);
            } else {
                showError(response?.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Error verifying OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="space-y-4">
            <Input
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSent}
            />

            {isSent && (
                <Input
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                    {loading ? 'Verifying...' : 'Verify Email'}
                </Button>
            )}
        </div>
    );
}
