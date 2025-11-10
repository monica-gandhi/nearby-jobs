'use client';
import React, { useState } from 'react';
import Link from "next/link";
import Icon from '../../../components/layout/AppIcon';
import Button from '../../../components/shared/button/page';

const SubscriptionPrompt = ({ jobType = 'premium', onClose, onSkip }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleSkip = () => {
    setIsVisible(false);
    if (onSkip) onSkip();
  };

  if (!isVisible) return null;

  const getPromptContent = () => {
    switch (jobType) {
      case 'international':
        return {
          icon: 'Globe',
          title: 'Unlock International Opportunities',
          description: 'Access exclusive international job listings from top global companies. Expand your career horizons with our premium subscription.',
          benefits: [
            'Access to 5,000+ international job listings',
            'Direct contact with international recruiters',
            'Visa sponsorship information',
            'Global salary insights and market data'
          ]
        };
      case 'contract':
        return {
          icon: 'Clock',
          title: 'Explore Contract Opportunities',
          description: 'Discover flexible contract work that fits your lifestyle. Get access to high-paying freelance and contract positions.',
          benefits: [
            'Access to 3,000+ contract job listings',
            'Flexible work arrangements',
            'Higher hourly rates and project-based pay',
            'Build your freelance portfolio'
          ]
        };
      default:
        return {
          icon: 'Crown',
          title: 'Unlock Premium Job Features',
          description: 'Get full access to all job listings, advanced search filters, and exclusive employer connections.',
          benefits: [
            'Unlimited job applications',
            'Advanced search and filtering',
            'Priority application status',
            'Exclusive recruiter connections'
          ]
        };
    }
  };

  const content = getPromptContent();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 max-w-md w-full animate-slide-in-from-top">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={content?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{content?.title}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <p className="text-muted-foreground mb-6">
            {content?.description}
          </p>

          <div className="space-y-3 mb-6">
            {content?.benefits?.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-md p-4 mb-6 text-center">
            <div className="text-2xl font-bold text-foreground">₹999</div>
            <div className="text-sm text-muted-foreground">per month</div>
            <div className="text-xs text-success mt-1">7-day free trial</div>
          </div>

          <div className="space-y-3">
            <Link href="/user-registration" className="block">
              <Button variant="default" fullWidth iconName="ArrowRight" iconPosition="right">
                Start Free Trial
              </Button>
            </Link>
            
            <div className="flex space-x-3">
              <Link href="/user-login" className="flex-1">
                <Button variant="outline" fullWidth>
                  Sign In
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="flex-1"
              >
                Skip for Now
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            No commitment. Cancel anytime during your trial period.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPrompt;