import React, { useState } from 'react';
import { Link } from 'next/link';
import Icon from '@/components/layout/AppIcon';
import Image from 'next/image';
import Button from '@/components/shared/button/page';
const JobCard = ({
  job,
  onBookmark,
  onApply,
  hasAccess = true
}) => {
  const [isBookmarked, setIsBookmarked] = useState(job?.isBookmarked || false);

  const handleBookmark = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(job?.id, !isBookmarked);
  };

  const handleApply = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onApply(job?.id);
  };

  const getJobTypeColor = () => {
    switch (job?.type) {
      case 'local':
        return 'bg-blue-100 text-blue-800';
      case 'international':
        return 'bg-green-100 text-green-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchColor = () => {
    if (job?.matchPercentage >= 80) return 'text-success';
    if (job?.matchPercentage >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-micro hover:shadow-elevation-2 relative">
      {!hasAccess && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Icon name="Lock" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground mb-2">Subscription Required</p>
            <Button variant="default" size="sm">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            {/* <Image
              src={job?.company?.logo}
              width={48}      
              height={48}
              alt={`${job?.company?.name} company logo showing corporate branding`}
              className="w-full h-full object-cover"
            /> */}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-md ${getJobTypeColor()}`}>
                {job?.type?.charAt(0)?.toUpperCase() + job?.type?.slice(1)}
              </span>
              {job?.isFeatured && (
                <Icon name="Star" size={16} className="text-warning" />
              )}
            </div>

            {/* <Link href={`/job-details?id=${job?.id}`} className="block">
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-micro mb-1">
                {job?.title}
              </h3>
            </Link> */}

            <p className="text-sm text-muted-foreground mb-2">{job?.company?.name}</p>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{job?.workType}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="DollarSign" size={14} />
                <span>{job?.salary}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {job?.matchPercentage && (
            <div className="text-right">
              <div className={`text-sm font-semibold ${getMatchColor()}`}>
                {job?.matchPercentage}% match
              </div>
              <div className="text-xs text-muted-foreground">compatibility</div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon
              name={isBookmarked ? "BookmarkCheck" : "Bookmark"}
              size={18}
              className={isBookmarked ? "text-primary" : ""}
            />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {job?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {job?.skills?.slice(0, 3)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-xs font-medium rounded-md text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {job?.skills?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{job?.skills?.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {job?.applicationStatus ? (
            <span className={`px-3 py-1 text-xs font-medium rounded-md ${job?.applicationStatus === 'applied' ? 'bg-blue-100 text-blue-800' :
                job?.applicationStatus === 'shortlisted' ? 'bg-green-100 text-green-800' :
                  job?.applicationStatus === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
              {job?.applicationStatus?.charAt(0)?.toUpperCase() + job?.applicationStatus?.slice(1)}
            </span>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleApply}
              iconName="Send"
              iconPosition="left"
              disabled={!hasAccess}
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Posted {job?.postedDate}</span>
          <span>{job?.applicantsCount} applicants</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;