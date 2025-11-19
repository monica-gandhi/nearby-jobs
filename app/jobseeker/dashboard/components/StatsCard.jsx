import React from 'react';
import Icon from '@/components/layout/AppIcon';
const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = 'text-primary' 
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-micro hover:shadow-elevation-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          
          {trendValue && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon()} 
                size={16} 
                className={getTrendColor()} 
              />
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {trendValue}
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={color} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;