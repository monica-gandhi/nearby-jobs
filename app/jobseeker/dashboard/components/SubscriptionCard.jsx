import React from 'react';
import Icon from '@/components/layout/AppIcon';
import Button from '@/components/shared/button/page';
const SubscriptionCard = ({ 
  type, 
  isActive, 
  expiryDate, 
  onUpgrade, 
  onManage 
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'local':
        return {
          title: 'Local Jobs',
          icon: 'MapPin',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'international':
        return {
          title: 'International Jobs',
          icon: 'Globe',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'contract':
        return {
          title: 'Contract Jobs',
          icon: 'FileText',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
      default:
        return {
          title: 'Unknown',
          icon: 'HelpCircle',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getTypeConfig();
  const isExpired = expiryDate && new Date(expiryDate) < new Date();

  return (
    <div className={`bg-card border ${config?.borderColor} rounded-lg p-6 transition-micro hover:shadow-elevation-2`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${config?.bgColor} rounded-lg flex items-center justify-center`}>
            <Icon name={config?.icon} size={24} className={config?.color} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{config?.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              {isActive && !isExpired ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-success font-medium">Active</span>
                </>
              ) : isExpired ? (
                <>
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                  <span className="text-sm text-error font-medium">Expired</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span className="text-sm text-muted-foreground font-medium">Inactive</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {isActive && !isExpired && (
          <Icon name="CheckCircle" size={20} className="text-success" />
        )}
      </div>
      {isActive && expiryDate && (
        <div className="mb-4 p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Expires on:</span>
            <span className="text-sm font-medium text-foreground">
              {new Date(expiryDate)?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          {!isExpired && (
            <div className="mt-2">
              <div className="text-xs text-muted-foreground">
                {Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex space-x-2">
        {isActive && !isExpired ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onManage(type)}
            iconName="Settings"
            iconPosition="left"
            className="flex-1"
          >
            Manage Plan
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => onUpgrade(type)}
            iconName="Crown"
            iconPosition="left"
            className="flex-1"
          >
            {isExpired ? 'Renew Plan' : 'Upgrade Now'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;