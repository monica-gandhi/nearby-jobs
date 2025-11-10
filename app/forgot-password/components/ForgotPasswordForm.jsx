'use client';
import React, { useState } from 'react';
import Link from "next/link";
import Icon from '../../../components/layout/AppIcon';
import Button from '../../../components/shared/button/page';
import Input from '../../../components/shared/input/page';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation - check if email exists in system
      const mockUsers = [
        'john.doe@example.com',
        'sarah.wilson@company.com',
        'admin@jobeazy.com',
        'employer@business.com'
      ];

      if (!mockUsers?.includes(email?.toLowerCase())) {
        setError('No account found with this email address');
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Check Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-muted rounded-md p-4">
              <h3 className="font-medium text-foreground mb-2">What's next?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check your email inbox (and spam folder)</li>
                <li>• Click the reset link within 15 minutes</li>
                <li>• Create a new secure password</li>
                <li>• Sign in with your new password</li>
              </ul>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Didn't receive the email? Check again in 2-3 minutes</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
            >
              Try Different Email
            </Button>
            <Link href="/user-login">
              <Button variant="ghost" fullWidth>
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="KeyRound" size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Forgot Password?</h2>
          <p className="text-muted-foreground">
            No worries! Enter your email address and we'll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            error={error}
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="Send"
            iconPosition="right"
          >
            {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Remember your password?
            </p>
            <Link href="/user-login">
              <Button variant="ghost" size="sm" iconName="ArrowLeft" iconPosition="left">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">Security Notice:</p>
                <p>Reset links expire in 15 minutes for your security. If you don't receive an email, check your spam folder or contact support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;