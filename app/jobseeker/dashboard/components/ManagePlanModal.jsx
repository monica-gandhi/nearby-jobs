import React, { useState } from 'react';
import Icon from '@/components/layout/AppIcon';
import Button from '@/components/shared/button/page';
const ManagePlanModal = ({ 
  isOpen, 
  onClose, 
  jobType, 
  onUpgrade, 
  onSkip 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const getTypeConfig = () => {
    switch (jobType) {
      case 'local':
        return {
          title: 'Local Jobs',
          icon: 'MapPin',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          description: 'Access local job opportunities in your city and nearby areas'
        };
      case 'international':
        return {
          title: 'International Jobs',
          icon: 'Globe',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          description: 'Explore global career opportunities and remote positions worldwide'
        };
      case 'contract':
        return {
          title: 'Contract Jobs',
          icon: 'FileText',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          description: 'Find freelance and contract-based work opportunities'
        };
      default:
        return {
          title: 'Premium Jobs',
          icon: 'Crown',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          description: 'Access premium job opportunities'
        };
    }
  };

  const config = getTypeConfig();

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      await onUpgrade(jobType);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    onSkip(jobType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 max-w-md w-full animate-slide-in-from-top">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Subscription Required</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${config?.bgColor} rounded-full mb-4`}>
              <Icon name={config?.icon} size={32} className={config?.color} />
            </div>
            
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {config?.title} Subscription
            </h4>
            
            <p className="text-muted-foreground text-sm mb-4">
              {config?.description}
            </p>

            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-foreground mb-1">₹999</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-foreground">Unlimited job applications</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-foreground">Priority application processing</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-foreground">Advanced job matching</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-foreground">Exclusive job alerts</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="default"
              onClick={handleUpgrade}
              loading={isLoading}
              iconName="Crown"
              iconPosition="left"
              fullWidth
            >
              Upgrade Now
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSkip}
              fullWidth
            >
              Skip for Now (View Only)
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              You can upgrade anytime from your subscription settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePlanModal;