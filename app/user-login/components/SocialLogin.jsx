'use client';
import React, { useState } from 'react';
import Button from '@/components/shared/button/page';
import { useAuthActions } from '@/common/hooks/useAuthActions';
import { showError} from '@/common/toast/toastService';
const SocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const { socialLogin, handlePostLogin } = useAuthActions();

  const onGoogleClick = async () => {
    setLoading(true);

    try {
      const data = await socialLogin();

      // ❌ If no role selected → stop
      if (!data) return;

      // ❌ If backend says login failed → stop + show error
      if (data?.response === false) {
        showError(data?.message || "Login failed");
        return;
      }

      // ✔️ Only run if login success
      await handlePostLogin(data);

    } catch (err) {
      console.error("Social login failed:", err);
      showError(err?.message || "Social login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button type="button" variant="outline" fullWidth loading={loading} onClick={onGoogleClick}>
        <div className="flex items-center justify-center space-x-3">
          {!loading && (/* google svg */ null)}
          <span>{loading ? 'Connecting...' : 'Continue with Google'}</span>
        </div>
      </Button>
    </div>
  );
};

export default SocialLogin;
