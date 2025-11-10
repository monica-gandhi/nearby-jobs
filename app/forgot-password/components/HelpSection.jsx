import React from 'react';
import Link from "next/link";
import Icon from '../../../components/layout/AppIcon';
import Button from '../../../components/shared/button/page';

const HelpSection = () => {
  const helpOptions = [
    {
      id: 'contact',
      icon: 'MessageSquare',
      title: 'Contact Support',
      description: 'Get help from our support team',
      action: 'Contact Us'
    },
    {
      id: 'register',
      icon: 'UserPlus',
      title: 'New to JobEazy?',
      description: 'Create a new account to get started',
      action: 'Sign Up Now',
      link: '/user-registration'
    },
    {
      id: 'browse',
      icon: 'Briefcase',
      title: 'Browse Jobs',
      description: 'Explore opportunities without signing in',
      action: 'View Jobs',
      link: '/'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-foreground mb-2">Need More Help?</h3>
        <p className="text-sm text-muted-foreground">
          Explore other options to access your account or get started
        </p>
      </div>
      <div className="space-y-3">
        {helpOptions?.map((option) => (
          <div key={option?.id} className="bg-card border border-border rounded-md p-4 hover:shadow-elevation-1 transition-micro">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                  <Icon name={option?.icon} size={20} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{option?.title}</h4>
                  <p className="text-xs text-muted-foreground">{option?.description}</p>
                </div>
              </div>
              {option?.link ? (
                <Link href={option?.link}>
                  <Button variant="ghost" size="sm">
                    {option?.action}
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="sm">
                  {option?.action}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-md">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Account Security</h4>
            <p className="text-xs text-muted-foreground mb-2">
              We take your account security seriously. All password reset requests are logged and monitored.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Reset links are single-use and expire quickly</li>
              <li>• We never ask for passwords via email</li>
              <li>• Suspicious activity is automatically flagged</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;