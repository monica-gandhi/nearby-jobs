import React from 'react';
import { Link } from 'next/link';
import Icon from '@/components/layout/AppIcon';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      description: 'Update your professional information',
      icon: 'User',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/profile-management'
    },
    {
      id: 'manage-resume',
      title: 'Manage Resume',
      description: 'Update or download your resume',
      icon: 'FileText',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: 'resume'
    },
    {
      id: 'subscription',
      title: 'Subscription Plans',
      description: 'Upgrade or manage your plans',
      icon: 'Crown',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/subscription-management'
    },
    {
      id: 'job-alerts',
      title: 'Job Alerts',
      description: 'Customize your job notifications',
      icon: 'Bell',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: 'alerts'
    }
  ];

  const handleActionClick = (action) => {
    if (onAction) {
      onAction(action?.action);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* {actions?.map((action) => (
          <div key={action?.id}>
            {action?.link ? (
              <Link
                href={action?.link}
                className="block p-4 border border-border rounded-lg transition-micro hover:shadow-elevation-1 hover:border-primary/20"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={action?.icon} size={20} className={action?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {action?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {action?.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => handleActionClick(action)}
                className="w-full p-4 border border-border rounded-lg transition-micro hover:shadow-elevation-1 hover:border-primary/20 text-left"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={action?.icon} size={20} className={action?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {action?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {action?.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </button>
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default QuickActions;