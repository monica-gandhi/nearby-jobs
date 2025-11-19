import React from 'react';
import Link from 'next/link';
import Icon from '@/components/layout/AppIcon';
import Image from 'next/image';
const ApplicationCard = ({ application }) => {
  const getStatusConfig = () => {
    switch (application?.status) {
      case 'applied':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: 'Send'
        };
      case 'viewed':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: 'Eye'
        };
      case 'shortlisted':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: 'CheckCircle'
        };
      case 'interview':
        return {
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          icon: 'Calendar'
        };
      case 'rejected':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: 'XCircle'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: 'Clock'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-card border border-border rounded-lg p-4 transition-micro hover:shadow-elevation-1">
      <div className="flex items-start space-x-3">
        {/* <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={application?.company?.logo}
            alt={`${application?.company?.name} company logo with corporate branding elements`}
            className="w-full h-full object-cover"
          />
        </div> */}
        
        <div className="flex-1 min-w-0">
          <Link 
            href={`/job-details?id=${application?.jobId}`}
            className="block"
          >
            <h4 className="text-sm font-semibold text-foreground hover:text-primary transition-micro mb-1">
              {application?.jobTitle}
            </h4>
          </Link>
          
          <p className="text-xs text-muted-foreground mb-2">
            {application?.company?.name}
          </p>
          
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${statusConfig?.bgColor}`}>
              <Icon name={statusConfig?.icon} size={12} className={statusConfig?.color} />
              <span className={`text-xs font-medium ${statusConfig?.color}`}>
                {application?.status?.charAt(0)?.toUpperCase() + application?.status?.slice(1)}
              </span>
            </div>
            
            <span className="text-xs text-muted-foreground">
              {application?.appliedDate}
            </span>
          </div>
          
          {application?.interviewDate && (
            <div className="mt-2 p-2 bg-accent/10 rounded-md">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} className="text-accent" />
                <span className="text-xs font-medium text-accent">
                  Interview: {application?.interviewDate}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;