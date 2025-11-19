'use client';
import React, { useState } from 'react';
import Button from '@/components/shared/button/page';
import Input from '@/components/shared/input/page';
import { useAuthActions } from '@/common/hooks/useAuthActions';
import Icon from '@/components/layout/AppIcon';

const LoginForm = () => {
  const { normalLogin, handlePostLogin } = useAuthActions();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const submit = async (e) => {
    e?.preventDefault();
    setErrors(null);

    if (!form.username || !form.password) {
      setErrors("Please fill username and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await normalLogin({
        username: form.username,
        password: form.password,
      });

      // ⛔ If no data (like no role selected)
      if (!data) return;

      // ⛔ If backend returns response:false → Show error + STOP
      if (data?.response === false) {
        setErrors(data?.message || "Invalid username or password");
        return; // ❗ STOP — do NOT redirect
      }

      // ⛔ If backend sends no token → treat as failed
      const token = data?.token || data?.data?.token;
      if (!token) {
        setErrors(data?.message || "Invalid login credentials");
        return; // ❗ STOP — do NOT redirect
      }

      // ✔ SUCCESS → Continue login flow
      await handlePostLogin(data);

    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      setErrors(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {errors && (
        <div className="p-3 bg-error/10 border border-error/20 rounded">
          <div className="flex items-center gap-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{errors}</span>
          </div>
        </div>
      )}

      <Input label="Email" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <Input label="Password" type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <div className="flex justify-between items-center">
        <div />
        <button type="button" className="text-sm text-primary" onClick={() => window.location.href = '/forgot-password'}>Forgot password?</button>
      </div>

      <Button type="submit" fullWidth loading={loading} iconName="LogIn" iconPosition="left">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
