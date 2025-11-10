import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '@/components/layout/AppIcon';
import Button from '@/components/shared/button/page';
const AnalyticsChart = () => {
  const [activeChart, setActiveChart] = useState('growth');
  const [timeRange, setTimeRange] = useState('7d');

  const growthData = [
    { name: 'Oct 12', users: 245, jobs: 89, revenue: 12400 },
    { name: 'Oct 13', users: 267, jobs: 94, revenue: 13200 },
    { name: 'Oct 14', users: 289, jobs: 102, revenue: 14100 },
    { name: 'Oct 15', users: 312, jobs: 87, revenue: 13800 },
    { name: 'Oct 16', users: 334, jobs: 115, revenue: 15600 },
    { name: 'Oct 17', users: 356, jobs: 98, revenue: 14900 },
    { name: 'Oct 18', users: 378, jobs: 123, revenue: 16800 }
  ];

  const subscriptionData = [
    { name: 'Local Jobs', value: 45, color: '#1E40AF' },
    { name: 'International', value: 30, color: '#0EA5E9' },
    { name: 'Contract Work', value: 25, color: '#64748B' }
  ];

  const categoryData = [
    { name: 'Technology', jobs: 156, applications: 2340 },
    { name: 'Healthcare', jobs: 89, applications: 1567 },
    { name: 'Finance', jobs: 67, applications: 1234 },
    { name: 'Education', jobs: 45, applications: 890 },
    { name: 'Marketing', jobs: 34, applications: 678 },
    { name: 'Sales', jobs: 28, applications: 456 }
  ];

  const chartOptions = [
    { id: 'growth', label: 'Platform Growth', icon: 'TrendingUp' },
    { id: 'subscriptions', label: 'Subscription Distribution', icon: 'PieChart' },
    { id: 'categories', label: 'Job Categories', icon: 'BarChart3' }
  ];

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const renderGrowthChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={growthData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="name" 
          stroke="#6B7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6B7280"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="users" 
          stroke="#1E40AF" 
          strokeWidth={2}
          name="New Users"
        />
        <Line 
          type="monotone" 
          dataKey="jobs" 
          stroke="#0EA5E9" 
          strokeWidth={2}
          name="Job Posts"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderSubscriptionChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={subscriptionData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {subscriptionData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderCategoryChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={categoryData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="name" 
          stroke="#6B7280"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#6B7280"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        />
        <Bar dataKey="jobs" fill="#1E40AF" name="Job Posts" />
        <Bar dataKey="applications" fill="#0EA5E9" name="Applications" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    switch (activeChart) {
      case 'growth':
        return renderGrowthChart();
      case 'subscriptions':
        return renderSubscriptionChart();
      case 'categories':
        return renderCategoryChart();
      default:
        return renderGrowthChart();
    }
  };

  const renderLegend = () => {
    if (activeChart === 'subscriptions') {
      return (
        <div className="flex items-center justify-center space-x-6 mt-4">
          {subscriptionData?.map((item) => (
            <div key={item?.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              ></div>
              <span className="text-sm text-muted-foreground">
                {item?.name} ({item?.value}%)
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
            >
              {timeRanges?.map((range) => (
                <option key={range?.id} value={range?.id}>
                  {range?.label}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {chartOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={activeChart === option?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChart(option?.id)}
              iconName={option?.icon}
              iconPosition="left"
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
        {renderLegend()}
      </div>
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-muted-foreground">Growth Rate: +12.5%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-accent" />
              <span className="text-muted-foreground">Active Users: 2,847</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Updated 5 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;