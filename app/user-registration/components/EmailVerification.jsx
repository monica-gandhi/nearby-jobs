'use client';
import { useState } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';

export default function EmailVerification({ onVerified }) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = () => {
        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        setError('');
        setIsSent(true);
        // TODO: Call API to send OTP
    };

    const handleVerifyOtp = () => {
        if (otp === '123456') {
            onVerified(email);
        } else {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="space-y-4">
            {/* <h3 className="text-xl font-semibold text-gray-800 mb-2">Verify your email</h3> */}

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

            {!isSent ? (
                <Button fullWidth onClick={handleSendOtp}>
                    Send OTP
                </Button>
            ) : (
                <Button fullWidth onClick={handleVerifyOtp}>
                    Verify Email
                </Button>
            )}
        </div>
    );
}
