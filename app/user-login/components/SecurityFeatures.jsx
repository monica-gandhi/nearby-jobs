'use client';
import React from 'react';
import Icon from '../../../components/layout/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Authentication',
      description: 'JWT token-based security with role-based access control'
    },
    {
      icon: 'Eye',
      title: 'Login Activity Tracking',
      description: 'Monitor your account access with device and location tracking'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'Your personal information is encrypted and securely stored'
    },
    {
      icon: 'AlertTriangle',
      title: 'Fraud Prevention',
      description: 'Advanced security measures to protect against unauthorized access'
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Your Security Matters
        </h3>
        <p className="text-sm text-muted-foreground">
          We implement industry-standard security measures to protect your account
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-muted/30 rounded-md border border-border"
          >
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-micro">
            Terms of Service
          </button>
          {' '}and{' '}
          <button className="text-primary hover:text-primary/80 transition-micro">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SecurityFeatures;