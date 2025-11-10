'use client';
import React, { useState } from 'react';
import Icon from '../../../components/layout/AppIcon';
import Button from '../../../components/shared/button/page';
import Input from '../../../components/shared/input/page';

const SearchSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch({ query: searchQuery, location });
    }
  };

  const popularSearches = [
    'Software Engineer', 'Product Manager', 'Data Scientist', 
    'UX Designer', 'Marketing Manager', 'Sales Executive'
  ];

  return (
    <section className="bg-card border-b border-border py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Search from 10,000+ Jobs
          </h2>
          <p className="text-muted-foreground">
            Find your next opportunity in seconds
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-background border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="h-12"
              />
            </div>
            
            <div className="md:col-span-5">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e?.target?.value)}
                  className="h-12 pl-10"
                />
                <Icon 
                  name="MapPin" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Button 
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                iconName="Search"
                iconPosition="left"
                className="h-12"
              >
                Search
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches?.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full text-sm transition-micro"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;