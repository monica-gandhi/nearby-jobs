'use client';
import React from 'react';
import JobCard from './JobCard';
import Icon from '../../../components/layout/AppIcon';
import Button from '../../../components/shared/button/page';

const JobListings = ({ 
  jobs = [], 
  loading = false, 
  activeFilter = 'all',
  isAuthenticated = false,
  onBookmark,
  onQuickApply,
  onLoadMore,
  hasMore = true
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-muted rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
            <div className="flex space-x-3">
              <div className="h-8 bg-muted rounded flex-1"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No jobs found
        </h3>
        <p className="text-muted-foreground mb-6">
          {activeFilter === 'all' ? "We couldn't find any jobs matching your criteria. Try adjusting your search or filters."
            : `No ${activeFilter} jobs available right now. Check back later or try other job types.`
          }
        </p>
        <Button variant="outline" iconName="RefreshCw" iconPosition="left">
          Refresh Results
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard
            key={job?.id}
            job={job}
            isAuthenticated={isAuthenticated}
            onBookmark={onBookmark}
            onQuickApply={onQuickApply}
          />
        ))}
      </div>
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobListings;