import React, { useState } from 'react';
import Icon from '@/components/layout/AppIcon';
import Button from '@/components/shared/button/page';
const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High Server Load',
      message: 'Server CPU usage is at 85%. Consider scaling resources.',
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Subscription Expiries',
      message: '47 subscriptions expiring in the next 7 days.',
      timestamp: new Date(Date.now() - 900000),
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'error',
      title: 'Payment Gateway Issue',
      message: 'Razorpay webhook failures detected. Check integration.',
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
      priority: 'critical'
    },
    {
      id: 4,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully.',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      priority: 'low'
    }
  ]);

  const markAsRead = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const getAlertIcon = (type) => {
    const icons = {
      error: 'AlertCircle',
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const getAlertColor = (type) => {
    const colors = {
      error: 'text-error',
      warning: 'text-warning',
      info: 'text-accent',
      success: 'text-success'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      critical: { color: 'bg-error/10 text-error border-error/20', label: 'Critical' },
      high: { color: 'bg-warning/10 text-warning border-warning/20', label: 'High' },
      medium: { color: 'bg-accent/10 text-accent border-accent/20', label: 'Medium' },
      low: { color: 'bg-muted text-muted-foreground border-border', label: 'Low' }
    };

    const config = priorityConfig?.[priority] || priorityConfig?.low;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp?.toLocaleDateString();
    }
  };

  const unreadCount = alerts?.filter(alert => !alert?.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} />
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">All Clear!</h4>
            <p className="text-muted-foreground">No system alerts at this time.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {alerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`p-4 hover:bg-muted/30 transition-micro ${
                  !alert?.isRead ? 'bg-muted/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon
                    name={getAlertIcon(alert?.type)}
                    size={20}
                    className={getAlertColor(alert?.type)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${
                        !alert?.isRead ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {alert?.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(alert?.priority)}
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(alert?.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{alert?.message}</p>
                    <div className="flex items-center space-x-2">
                      {!alert?.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(alert?.id)}
                        >
                          <Icon name="Check" size={14} />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlert(alert?.id)}
                      >
                        <Icon name="X" size={14} />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {alerts?.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm">
              <Icon name="Archive" size={16} />
              View All Alerts
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAlerts(alerts?.map(alert => ({ ...alert, isRead: true })))}
            >
              Mark All as Read
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;