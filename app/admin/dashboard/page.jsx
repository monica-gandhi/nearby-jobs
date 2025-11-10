'use client';
import React from 'react';
import KPICard from './components/KPICard';
import ActivityTable from './components/ActivityTable';
import QuickActionPanel from './components/QuickActionPanel';
import AlertsPanel from './components/AlertsPanel';
import AnalyticsChart from './components/AnalyticsChart';

const AdminDashboard = () => {
  // Mock KPI data
  const kpiData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      trend: 'up',
      icon: 'Users',
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Active Subscriptions',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      trend: 'up',
      icon: 'CreditCard',
      iconColor: 'bg-green-500'
    },
    {
      title: 'Job Postings',
      value: '567',
      change: '+15.3%',
      changeType: 'positive',
      trend: 'up',
      icon: 'Briefcase',
      iconColor: 'bg-purple-500'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,678',
      change: '+23.1%',
      changeType: 'positive',
      trend: 'up',
      icon: 'DollarSign',
      iconColor: 'bg-orange-500'
    }
  ];

  // Mock activity data
  const recentActivities = [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userEmail: 'sarah.johnson@email.com',
      activity: 'New user registration',
      details: 'Applicant account created',
      status: 'active',
      type: 'user',
      date: new Date(Date.now() - 300000)?.toISOString()
    },
    {
      id: 2,
      userName: 'TechCorp Inc.',
      userEmail: 'hr@techcorp.com',
      activity: 'Job posting created',
      details: 'Senior React Developer position',
      status: 'active',
      type: 'employer',
      date: new Date(Date.now() - 600000)?.toISOString()
    },
    {
      id: 3,
      userName: 'Michael Chen',
      userEmail: 'michael.chen@email.com',
      activity: 'Subscription upgraded',
      details: 'International job access purchased',
      status: 'completed',
      type: 'subscription',
      date: new Date(Date.now() - 900000)?.toISOString()
    },
    {
      id: 4,
      userName: 'Emma Wilson',
      userEmail: 'emma.wilson@email.com',
      activity: 'Login activity',
      details: 'Successful login from Chrome browser',
      status: 'active',
      type: 'login',
      date: new Date(Date.now() - 1200000)?.toISOString()
    },
    {
      id: 5,
      userName: 'Global Solutions Ltd.',
      userEmail: 'billing@globalsolutions.com',
      activity: 'Payment processed',
      details: 'Monthly subscription renewal - $99',
      status: 'completed',
      type: 'payment',
      date: new Date(Date.now() - 1500000)?.toISOString()
    },
    {
      id: 6,
      userName: 'David Rodriguez',
      userEmail: 'david.rodriguez@email.com',
      activity: 'Profile updated',
      details: 'Resume and skills information updated',
      status: 'active',
      type: 'user',
      date: new Date(Date.now() - 1800000)?.toISOString()
    },
    {
      id: 7,
      userName: 'StartupHub',
      userEmail: 'jobs@startuphub.com',
      activity: 'Job application received',
      details: 'Frontend Developer position - 5 new applications',
      status: 'pending',
      type: 'employer',
      date: new Date(Date.now() - 2100000)?.toISOString()
    },
    {
      id: 8,
      userName: 'Lisa Thompson',
      userEmail: 'lisa.thompson@email.com',
      activity: 'Subscription expired',
      details: 'Contract job access subscription ended',
      status: 'expired',
      type: 'subscription',
      date: new Date(Date.now() - 2400000)?.toISOString()
    }
  ];

  const loginActivities = [
    {
      id: 1,
      userName: 'Admin User',
      userEmail: 'admin@jobeazy.com',
      activity: 'Admin dashboard access',
      details: 'Logged in from IP: 192.168.1.100',
      status: 'active',
      type: 'login',
      date: new Date(Date.now() - 180000)?.toISOString()
    },
    {
      id: 2,
      userName: 'John Smith',
      userEmail: 'john.smith@email.com',
      activity: 'Mobile app login',
      details: 'iOS app login successful',
      status: 'active',
      type: 'login',
      date: new Date(Date.now() - 480000)?.toISOString()
    },
    {
      id: 3,
      userName: 'Maria Garcia',
      userEmail: 'maria.garcia@email.com',
      activity: 'Failed login attempt',
      details: 'Incorrect password - Account locked',
      status: 'failed',
      type: 'login',
      date: new Date(Date.now() - 720000)?.toISOString()
    },
    {
      id: 4,
      userName: 'Robert Johnson',
      userEmail: 'robert.johnson@email.com',
      activity: 'Password reset',
      details: 'Password changed successfully',
      status: 'completed',
      type: 'login',
      date: new Date(Date.now() - 1020000)?.toISOString()
    },
    {
      id: 5,
      userName: 'Jennifer Lee',
      userEmail: 'jennifer.lee@email.com',
      activity: 'Session timeout',
      details: 'Automatic logout after 30 minutes',
      status: 'expired',
      type: 'login',
      date: new Date(Date.now() - 1320000)?.toISOString()
    }
  ];

  const subscriptionTransactions = [
    {
      id: 1,
      userName: 'Alex Kumar',
      userEmail: 'alex.kumar@email.com',
      activity: 'Premium subscription purchased',
      details: 'International + Contract access - $149/month',
      status: 'completed',
      type: 'subscription',
      date: new Date(Date.now() - 240000)?.toISOString()
    },
    {
      id: 2,
      userName: 'Creative Agency Co.',
      userEmail: 'billing@creativeagency.com',
      activity: 'Employer plan renewal',
      details: 'Annual billing - $1,200 saved 20%',
      status: 'completed',
      type: 'payment',
      date: new Date(Date.now() - 540000)?.toISOString()
    },
    {
      id: 3,
      userName: 'Sophie Martin',
      userEmail: 'sophie.martin@email.com',
      activity: 'Subscription cancelled',
      details: 'Local jobs plan - Refund processed',
      status: 'completed',
      type: 'subscription',
      date: new Date(Date.now() - 840000)?.toISOString()
    },
    {
      id: 4,
      userName: 'Tech Innovations Ltd.',
      userEmail: 'finance@techinnovations.com',
      activity: 'Payment failed',
      details: 'Credit card declined - Retry scheduled',
      status: 'failed',
      type: 'payment',
      date: new Date(Date.now() - 1140000)?.toISOString()
    },
    {
      id: 5,
      userName: 'Carlos Rodriguez',
      userEmail: 'carlos.rodriguez@email.com',
      activity: 'Trial period started',
      details: '14-day free trial - All features unlocked',
      status: 'active',
      type: 'subscription',
      date: new Date(Date.now() - 1440000)?.toISOString()
    }
  ];


  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive platform management and analytics overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      <div className="mb-8">
        <AnalyticsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <QuickActionPanel />
        <AlertsPanel />
      </div>

      <div className="space-y-8">
        <ActivityTable title="Recent User Activity" data={recentActivities} type="general" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityTable title="Login Activity" data={loginActivities} type="login" />
          <ActivityTable
            title="Subscription Transactions"
            data={subscriptionTransactions}
            type="subscription"
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
