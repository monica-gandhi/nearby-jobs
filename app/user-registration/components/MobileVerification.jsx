'use client';
import { useState } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';

export default function MobileVerification({ onVerified }) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setIsSent(true);
    // TODO: API to send mobile OTP
  };

  const handleVerifyOtp = () => {
    if (otp === '654321') {
      onVerified(mobile);
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Verify your mobile number</h3>

      <Input
        label="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
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
          Verify Mobile
        </Button>
      )}
    </div>
  );
}
