'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import HeroSection from './landing-page/components/HeroSection';
import SearchSection from './landing-page/components/SearchSection';
import JobTypeFilter from './landing-page/components/JobTypeFilter';
import JobListings from './landing-page/components/JobListings';
import TrustSignals from './landing-page/components/TrustSignals';
import SubscriptionPrompt from './landing-page/components/SubscriptionPrompt';
import NotificationPrompt from '@/components/shared/notification-prompt/page';

const ClientOnly = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return children;
};

const LandingPage = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [promptJobType, setPromptJobType] = useState('premium');
  const [isAuthenticated] = useState(false);
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [permissionState, setPermissionState] = useState('default');

  // Check if notifications are granted; otherwise, keep showing dialog
  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    const checkPermission = () => {
      const current = Notification.permission;
      setPermissionState(current);
      setShowNotificationPrompt(current !== 'granted');
    };

    checkPermission();
    document.addEventListener('visibilitychange', checkPermission);

    return () => document.removeEventListener('visibilitychange', checkPermission);
  }, []);

  // Ask permission every time until granted
  const handleAllowNotifications = async () => {
    if (!('Notification' in window)) return;

    try {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);

      if (permission === 'granted') {
        new Notification('Notifications Enabled!', {
          body: 'You’ll now receive job alerts and updates!',
        });
        setShowNotificationPrompt(false);
      } else if (permission === 'denied') {
        window.open('chrome://settings/content/notifications', '_blank');
        setShowNotificationPrompt(true);
      } else {
        setShowNotificationPrompt(true);
      }
    } catch (error) {
      console.error('Notification error:', error);
      setShowNotificationPrompt(true);
    }
  };

  // ---------------- MOCK JOB DATA ----------------
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: { name: 'TechCorp Solutions', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop' },
      location: 'San Francisco, CA',
      salary: '$120k - $180k',
      type: 'Full-time',
      jobType: 'local',
      description: "We're looking for a senior software engineer...",
      postedDate: '2 days ago',
      isPremium: false,
      isBookmarked: false,
    },
    {
      id: 2,
      title: 'Product Manager',
      company: { name: 'Global Innovations Ltd', logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop' },
      location: 'London, UK (Remote)',
      salary: '£80k - £120k',
      type: 'Full-time',
      jobType: 'international',
      description: 'Lead product strategy for our international markets...',
      postedDate: '1 day ago',
      isPremium: true,
      isBookmarked: false,
    },
  ];

  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  useEffect(() => {
    let filtered = mockJobs;
    if (activeFilter !== 'all') filtered = filtered.filter((j) => j.jobType === activeFilter);
    if (searchQuery) {
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredJobs(filtered);
  }, [activeFilter, searchQuery]);

  const jobCounts = React.useMemo(
    () => ({
      all: mockJobs.length,
      local: mockJobs.filter((j) => j.jobType === 'local').length,
      international: mockJobs.filter((j) => j.jobType === 'international').length,
    }),
    [mockJobs]
  );

  const handleSearch = ({ query }) => setSearchQuery(query);
  const handleFilterChange = (filter) => setActiveFilter(filter);

  const handleBookmark = (id) => {
    if (!isAuthenticated) router.push('/user-login');
  };

  const handleQuickApply = (id) => {
    const job = mockJobs.find((j) => j.id === id);
    if (!isAuthenticated) return router.push('/user-login');
    if (job.isPremium) {
      setPromptJobType(job.jobType);
      setShowSubscriptionPrompt(true);
      return;
    }
    router.push(`/job-details?id=${id}`);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      
      <Header isAuthenticated={isAuthenticated} userRole={null} subscriptionStatus="active" />
      <main className="pt-16">
        <HeroSection />
        <SearchSection onSearch={handleSearch} />

        <ClientOnly>
          <JobTypeFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} jobCounts={jobCounts} />
        </ClientOnly>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {activeFilter === 'all' ? 'All Jobs' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Jobs`}
            </h2>
            <p className="text-muted-foreground">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          <ClientOnly>
            <JobListings
              jobs={filteredJobs}
              loading={loading}
              activeFilter={activeFilter}
              isAuthenticated={isAuthenticated}
              onBookmark={handleBookmark}
              onQuickApply={handleQuickApply}
              onLoadMore={handleLoadMore}
              hasMore={true}
            />
          </ClientOnly>
        </section>

        <TrustSignals />
      </main>

      {showSubscriptionPrompt && (
        <SubscriptionPrompt
          jobType={promptJobType}
          onClose={() => setShowSubscriptionPrompt(false)}
          onSkip={() => setShowSubscriptionPrompt(false)}
        />
      )}

      {showNotificationPrompt && (
        <NotificationPrompt open={showNotificationPrompt} onAllow={handleAllowNotifications} />
      )}
    </div>
  );
};

export default LandingPage;


