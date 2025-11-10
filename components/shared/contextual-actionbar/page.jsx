import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../layout/AppIcon';
import Button from '../button/page';

const ContextualActionBar = ({ 
  userRole = 'applicant', 
  subscriptionStatus = 'active',
  jobData = null,
  profileData = null,
  onAction
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const location = useLocation();

  const handleAction = (actionType, data = {}) => {
    if (onAction) {
      onAction(actionType, data);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    handleAction('bookmark', { bookmarked: !isBookmarked });
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: jobData?.title || 'JobEazy Profile',
          text: jobData?.description || 'Check out this profile on JobEazy',
          url: window.location?.href,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard?.writeText(window.location?.href);
        // Show toast notification here
      }
      handleAction('share', { method: navigator.share ? 'native' : 'clipboard' });
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const getJobDetailsActions = () => {
    const actions = [];

    if (userRole === 'applicant') {
      // Check subscription for premium features
      const canApply = subscriptionStatus === 'active' || jobData?.isPremium === false;
      
      actions?.push({
        id: 'apply',
        label: canApply ? 'Apply Now' : 'Upgrade to Apply',
        icon: canApply ? 'Send' : 'Lock',
        variant: canApply ? 'default' : 'outline',
        disabled: !canApply && jobData?.isPremium,
        onClick: () => handleAction('apply', { requiresUpgrade: !canApply })
      });

      actions?.push({
        id: 'bookmark',
        label: isBookmarked ? 'Bookmarked' : 'Bookmark',
        icon: isBookmarked ? 'BookmarkCheck' : 'Bookmark',
        variant: 'outline',
        onClick: handleBookmark
      });
    }

    if (userRole === 'employer' && jobData?.isOwner) {
      actions?.push({
        id: 'edit',
        label: 'Edit Job',
        icon: 'Edit',
        variant: 'outline',
        onClick: () => handleAction('edit')
      });

      actions?.push({
        id: 'candidates',
        label: 'View Candidates',
        icon: 'Users',
        variant: 'default',
        onClick: () => handleAction('viewCandidates')
      });

      actions?.push({
        id: 'promote',
        label: 'Promote Job',
        icon: 'TrendingUp',
        variant: 'outline',
        onClick: () => handleAction('promote')
      });
    }

    if (userRole === 'admin') {
      actions?.push({
        id: 'moderate',
        label: 'Moderate',
        icon: 'Shield',
        variant: 'outline',
        onClick: () => handleAction('moderate')
      });

      actions?.push({
        id: 'feature',
        label: jobData?.isFeatured ? 'Unfeature' : 'Feature',
        icon: 'Star',
        variant: 'outline',
        onClick: () => handleAction('toggleFeature')
      });
    }

    // Common actions
    actions?.push({
      id: 'share',
      label: 'Share',
      icon: 'Share2',
      variant: 'ghost',
      loading: isSharing,
      onClick: handleShare
    });

    return actions;
  };

  const getProfileActions = () => {
    const actions = [];

    if (userRole === 'applicant' && profileData?.isOwner) {
      actions?.push({
        id: 'edit',
        label: 'Edit Profile',
        icon: 'Edit',
        variant: 'default',
        onClick: () => handleAction('editProfile')
      });

      actions?.push({
        id: 'preview',
        label: 'Preview',
        icon: 'Eye',
        variant: 'outline',
        onClick: () => handleAction('previewProfile')
      });

      const canDownloadResume = subscriptionStatus === 'active';
      actions?.push({
        id: 'download',
        label: canDownloadResume ? 'Download Resume' : 'Upgrade for Resume',
        icon: canDownloadResume ? 'Download' : 'Lock',
        variant: 'outline',
        disabled: !canDownloadResume,
        onClick: () => handleAction('downloadResume', { requiresUpgrade: !canDownloadResume })
      });
    }

    if (userRole === 'employer' && !profileData?.isOwner) {
      actions?.push({
        id: 'contact',
        label: 'Contact Candidate',
        icon: 'MessageSquare',
        variant: 'default',
        onClick: () => handleAction('contactCandidate')
      });

      actions?.push({
        id: 'shortlist',
        label: profileData?.isShortlisted ? 'Shortlisted' : 'Shortlist',
        icon: profileData?.isShortlisted ? 'CheckCircle' : 'Plus',
        variant: 'outline',
        onClick: () => handleAction('toggleShortlist')
      });
    }

    actions?.push({
      id: 'share',
      label: 'Share Profile',
      icon: 'Share2',
      variant: 'ghost',
      loading: isSharing,
      onClick: handleShare
    });

    return actions;
  };

  const getSubscriptionActions = () => {
    const actions = [];

    actions?.push({
      id: 'upgrade',
      label: 'Upgrade Plan',
      icon: 'Crown',
      variant: 'default',
      onClick: () => handleAction('upgradePlan')
    });

    actions?.push({
      id: 'billing',
      label: 'Billing History',
      icon: 'Receipt',
      variant: 'outline',
      onClick: () => handleAction('viewBilling')
    });

    actions?.push({
      id: 'cancel',
      label: 'Cancel Subscription',
      icon: 'X',
      variant: 'ghost',
      onClick: () => handleAction('cancelSubscription')
    });

    return actions;
  };

  const getActionsForCurrentPage = () => {
    const path = location?.pathname;
    
    if (path?.includes('/job-details')) {
      return getJobDetailsActions();
    } else if (path?.includes('/profile-management')) {
      return getProfileActions();
    } else if (path?.includes('/subscription-management')) {
      return getSubscriptionActions();
    }
    
    return [];
  };

  const actions = getActionsForCurrentPage();
  
  if (actions?.length === 0) return null;

  const primaryActions = actions?.slice(0, 3);
  const secondaryActions = actions?.slice(3);

  return (
    <div className="sticky top-20 bg-card border border-border rounded-md shadow-elevation-1 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {primaryActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              size="sm"
              disabled={action?.disabled}
              loading={action?.loading}
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
            >
              {action?.label}
            </Button>
          ))}
        </div>

        {secondaryActions?.length > 0 && (
          <div className="flex items-center space-x-2">
            {secondaryActions?.map((action) => (
              <Button
                key={action?.id}
                variant={action?.variant}
                size="sm"
                disabled={action?.disabled}
                loading={action?.loading}
                onClick={action?.onClick}
              >
                <Icon name={action?.icon} size={16} />
              </Button>
            ))}
          </div>
        )}
      </div>
      {/* Subscription Warning */}
      {actions?.some(action => action?.id === 'apply' && action?.disabled) && (
        <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">
              Premium job - Upgrade your subscription to apply
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextualActionBar;