'use client';
import React from 'react';
import Icon from '../../../components/layout/AppIcon';

const RoleIndicator = () => {
  const roleTypes = [
    {
      id: 'jobseeker',
      label: 'Job Seeker',
      icon: 'User',
      description: 'Find your dream job',
      color: 'text-accent'
    },
    {
      id: 'employer',
      label: 'Employer',
      icon: 'Building2',
      description: 'Hire top talent',
      color: 'text-primary'
    }
  ];

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Welcome to JobEazy
        </h3>
        <p className="text-sm text-muted-foreground">
          Sign in to access your personalized dashboard
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {roleTypes?.map((role) => (
          <div
            key={role?.id}
            className="flex flex-col items-center p-4 bg-muted/50 rounded-md border border-border hover:bg-muted transition-micro"
          >
            <div className={`w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mb-3`}>
              <Icon name={role?.icon} size={20} className={role?.color} />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              {role?.label}
            </h4>
            <p className="text-xs text-muted-foreground text-center">
              {role?.description}
            </p>
          </div>
        ))}
      </div>
      {/* <div className="bg-accent/10 border border-accent/20 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">
              Demo Credentials Available
            </h4>
            <p className="text-xs text-muted-foreground">
              Use the demo credentials provided in the error message to explore different user roles and features.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default RoleIndicator;