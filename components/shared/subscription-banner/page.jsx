import React, { useState } from 'react';
import Icon from '../../layout/AppIcon';
import Button from '../button/page';

const SubscriptionBanner = ({ 
  subscriptionStatus = 'expired', 
  userRole = 'applicant',
  onUpgrade,
  onDismiss,
  showModal = false,
  onCloseModal
}) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  const getBannerContent = () => {
    switch (subscriptionStatus) {
      case 'expired':
        return {
          icon: 'AlertTriangle',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          title: 'Subscription Expired',
          message: userRole === 'employer' ?'Your job posting privileges have been suspended. Upgrade now to continue recruiting top talent.' :'Your premium job search features are no longer available. Upgrade to access exclusive opportunities.',
          ctaText: 'Renew Subscription',
          urgency: true
        };
      case 'trial':
        return {
          icon: 'Clock',
          iconColor: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          title: 'Trial Period Active',
          message: userRole === 'employer' ?'You have 3 days left in your trial. Upgrade to continue posting unlimited jobs.' :'You have 3 days left to explore premium features. Upgrade to keep your competitive advantage.',
          ctaText: 'Upgrade Now',
          urgency: false
        };
      case 'limited':
        return {
          icon: 'Zap',
          iconColor: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          title: 'Upgrade Available',
          message: userRole === 'employer' ?'Unlock advanced candidate filtering and priority job placement with our premium plan.' :'Get access to salary insights, application tracking, and exclusive job alerts.',
          ctaText: 'See Premium Features',
          urgency: false
        };
      default:
        return null;
    }
  };

  const content = getBannerContent();
  if (!content) return null;

  const handleUpgradeClick = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onCloseModal) onCloseModal();
  };

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 max-w-md w-full animate-slide-in-from-top">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Upgrade Your Plan</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseModal}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${content?.bgColor} mb-4`}>
                <Icon name="Crown" size={32} className="text-accent" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {userRole === 'employer' ? 'Employer Premium' : 'JobSeeker Pro'}
              </h4>
              <p className="text-muted-foreground">
                {userRole === 'employer' ?'Advanced recruiting tools for serious hiring managers' :'Premium job search features for career advancement'
                }
              </p>
            </div>

            <div className="space-y-3">
              {userRole === 'employer' ? (
                <>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Unlimited job postings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Advanced candidate filtering</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Priority job placement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Detailed analytics dashboard</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Unlimited job applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Salary insights & market data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Application tracking system</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm">Exclusive job alerts</span>
                  </div>
                </>
              )}
            </div>

            <div className="bg-muted rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-foreground">₹999</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                className="flex-1"
              >
                Maybe Later
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  // Handle payment integration
                  handleCloseModal();
                }}
                className="flex-1"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={`${content?.bgColor} ${content?.borderColor} border rounded-md p-4 mb-6`}>
        <div className="flex items-start space-x-3">
          <Icon name={content?.icon} size={20} className={content?.iconColor} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{content?.title}</h4>
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 mb-3">{content?.message}</p>
            <div className="flex items-center space-x-3">
              <Button
                variant={content?.urgency ? "default" : "outline"}
                size="sm"
                onClick={handleUpgradeClick}
                iconName="ArrowRight"
                iconPosition="right"
              >
                {content?.ctaText}
              </Button>
              {content?.urgency && (
                <span className="text-xs text-muted-foreground">
                  Limited time offer
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <UpgradeModal />}
    </>
  );
};

export default SubscriptionBanner;