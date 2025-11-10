import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Icon from '../../../components/layout/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/shared/button/page';

const JobCard = ({ job, isAuthenticated = false, onBookmark, onQuickApply }) => {
  const [mounted, setMounted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsBookmarked(job?.isBookmarked || false);
  }, [job?.isBookmarked]);

  if (!mounted) return null; // prevent SSR mismatch

  const handleBookmark = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!isAuthenticated) return;
    
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark(job?.id, !isBookmarked);
  };

  const handleQuickApply = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (onQuickApply) onQuickApply(job?.id);
  };

  const getJobTypeBadge = (type) => {
    const badges = {
      local: { color: 'bg-green-100 text-green-800', icon: 'MapPin' },
      international: { color: 'bg-blue-100 text-blue-800', icon: 'Globe' },
      contract: { color: 'bg-purple-100 text-purple-800', icon: 'Clock' }
    };
    const badge = badges?.[type] || badges.local;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon name={badge.icon} size={12} className="mr-1" />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-micro">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image src={job?.company?.logo} alt={`${job?.company?.name} logo`} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-foreground truncate">{job?.title}</h3>
            <p className="text-muted-foreground text-sm">{job?.company?.name}</p>
          </div>
        </div>
        
        <button
          onClick={handleBookmark}
          className="p-2 hover:bg-muted rounded-md transition-micro"
        >
          <Icon 
            name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
            size={20} 
            className={isBookmarked ? "text-primary" : "text-muted-foreground"} 
          />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span>{job?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="DollarSign" size={16} />
            <span>{job?.salary}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{job?.type}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {getJobTypeBadge(job?.jobType)}
          <span className="text-xs text-muted-foreground">Posted {job?.postedDate}</span>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{job?.description}</p>

      <div className="flex items-center space-x-3">
        <Link href={`/job-details?id=${job?.id}`} passHref>
          <Button asChild variant="outline" size="sm" fullWidth>
            <span>View Details</span>
          </Button>
        </Link>
        
        <Button variant="default" size="sm" onClick={handleQuickApply} iconName="Send" iconPosition="left">
          Quick Apply
        </Button>
      </div>

      {job?.isPremium && (
        <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Crown" size={16} className="text-warning" />
            <span className="text-xs text-warning font-medium">Premium Job - Subscription Required</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
