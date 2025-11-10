'use client';
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/layout/AppIcon';

const JobTypeFilter = ({ activeFilter, onFilterChange, jobCounts }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // mark as client
  }, []);

  if (!mounted) return null; // render nothing on SSR

  const filters = [
    { id: 'all', label: 'All Jobs', icon: 'Briefcase', count: jobCounts?.all || 0 },
    { id: 'local', label: 'Local', icon: 'MapPin', count: jobCounts?.local || 0 },
    { id: 'international', label: 'International', icon: 'Globe', count: jobCounts?.international || 0 },
    { id: 'contract', label: 'Contract', icon: 'Clock', count: jobCounts?.contract || 0 },
  ];

  return (
    <div className="bg-card border-b border-border sticky top-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={filter.icon} size={16} />
                <span>{filter.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={16} />
              <span>Sort by:</span>
            </div>
            <select className="bg-background border border-border rounded-md px-3 py-1 text-sm text-foreground">
              <option value="newest">Newest First</option>
              <option value="salary">Highest Salary</option>
              <option value="relevance">Most Relevant</option>
              <option value="company">Company A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTypeFilter;
