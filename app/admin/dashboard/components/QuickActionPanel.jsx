import React from 'react';
import Link from 'next/link';
import Icon from '@/components/layout/AppIcon';
import Button from '@/components/shared/button/page';
const QuickActionPanel = () => {
  const quickActions = [
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: 'Users',
      iconColor: 'bg-blue-500',
      path: '/admin/users',
      count: '2,847'
    },
    {
      id: 'jobs',
      title: 'Job Categories',
      description: 'Organize and manage job categories',
      icon: 'Tag',
      iconColor: 'bg-green-500',
      path: '/admin/categories',
      count: '156'
    },
    {
      id: 'pricing',
      title: 'Pricing Plans',
      description: 'Configure subscription plans',
      icon: 'CreditCard',
      iconColor: 'bg-purple-500',
      path: '/subscription-management',
      count: '8'
    },
    {
      id: 'content',
      title: 'Content Moderation',
      description: 'Review and moderate platform content',
      icon: 'Shield',
      iconColor: 'bg-orange-500',
      path: '/admin/moderation',
      count: '23'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Button variant="outline" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <Link
            key={action?.id}
            href={action?.path}
            className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-micro"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.iconColor}`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-micro">
                    {action?.title}
                  </h4>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {action?.count}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{action?.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">System Status: Healthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Activity" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last updated: 2 min ago</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;