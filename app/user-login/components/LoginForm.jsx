'use client';
import React, { useState, useId } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../../components/shared/button/page';
import Input from '../../../components/shared/input/page';
import { Checkbox } from '../../../components/shared/checkbox/page';
import Icon from '../../../components/layout/AppIcon';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/common/store/auth/authSlice';
import { signInWithGoogle } from '@/common/config/firebase.config';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Stable IDs for hydration
  const emailId = useId();
  const passwordId = useId();
  const rememberMeId = useId();

  // Mock credentials
  const mockCredentials = {
    applicant: { email: 'john.doe@example.com', password: 'password123' },
    employer: { email: 'hr@techcorp.com', password: 'employer123' },
    admin: { email: 'admin@jobeazy.com', password: 'admin123' }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      let userRole = null;
      let isValidCredentials = false;

      Object.entries(mockCredentials).forEach(([role, credentials]) => {
        if (formData.email === credentials.email && formData.password === credentials.password) {
          userRole = role;
          isValidCredentials = true;
        }
      });

      if (!isValidCredentials) {
        setErrors({
          general: `Invalid credentials. Try: ${mockCredentials.applicant.email} / ${mockCredentials.applicant.password} (Applicant), ${mockCredentials.employer.email} / ${mockCredentials.employer.password} (Employer), or ${mockCredentials.admin.email} / ${mockCredentials.admin.password} (Admin)`
        });
        return;
      }

      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userEmail', formData.email);
      if (formData.rememberMe) localStorage.setItem('rememberMe', 'true');

      const loginActivity = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ip: '192.168.1.1',
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
      };
      localStorage.setItem('lastLoginActivity', JSON.stringify(loginActivity));

      switch (userRole) {
        case 'applicant': navigate('/applicant-dashboard'); break;
        case 'employer': navigate('/employer-dashboard'); break;
        case 'admin': navigate('/admin/dashboard'); break;
        default: navigate('/landing-page');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // Dispatch to redux store
      dispatch(loginSuccess({ token: idToken, user: { uid: user.uid, email: user.email, name: user.displayName } }));

      // Keep compatibility with existing localStorage usage in project
      localStorage.setItem('authToken', idToken);
      localStorage.setItem('userEmail', user.email || '');

      // Navigate to landing or dashboard - modify as needed
      router.push('/landing-page');
    } catch (err) {
      console.error('Google sign-in error', err);
      setErrors({ general: 'Google sign-in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-md flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} className="text-error" />
          <span className="text-sm text-error">{errors.general}</span>
        </div>
      )}

      <Input
        id={emailId}
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />

      <Input
        id={passwordId}
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
      />

      <div className="flex items-center justify-between mt-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            id={rememberMeId}
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          <span className="text-sm text-gray-700">Remember me</span>
        </label>

        <button
          type="button"
          onClick={() => router.push('/forgot-password')}
          className="text-sm text-primary hover:text-primary/80 transition-micro"
        >
          Forgot password?
        </button>
      </div>


      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
