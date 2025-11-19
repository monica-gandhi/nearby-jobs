'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Icon from '@/components/layout/AppIcon';
import Button from '@/components/shared/button/page';
import SubscriptionCard from './components/SubscriptionCard';
import StatsCard from './components/StatsCard';
import JobCard from './components/JobCard';
import ApplicationCard from './components/ApplicationCard';
import QuickActions from './components/QuickActions';
import ManagePlanModal from './components/ManagePlanModal';

const ApplicantDashboard = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    jobType: null
  });
  const [viewOnlyAccess, setViewOnlyAccess] = useState({
    local: false,
    international: false,
    contract: false
  });

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    profileImage: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
    profileImageAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer",
    subscriptions: {
      local: {
        isActive: true,
        expiryDate: "2025-01-15"
      },
      international: {
        isActive: false,
        expiryDate: null
      },
      contract: {
        isActive: true,
        expiryDate: "2024-12-20"
      }
    }
  };

  // Mock statistics data
  const statsData = [
  {
    title: "Applications Sent",
    value: "24",
    icon: "Send",
    trend: "up",
    trendValue: "+12%",
    color: "text-blue-600"
  },
  {
    title: "Profile Views",
    value: "156",
    icon: "Eye",
    trend: "up",
    trendValue: "+8%",
    color: "text-green-600"
  },
  {
    title: "Bookmarked Jobs",
    value: "18",
    icon: "Bookmark",
    trend: "neutral",
    trendValue: "0%",
    color: "text-purple-600"
  },
  {
    title: "Interview Invites",
    value: "3",
    icon: "Calendar",
    trend: "up",
    trendValue: "+2",
    color: "text-orange-600"
  }];


  // Mock recommended jobs data
  const recommendedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: {
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    },
    location: "San Francisco, CA",
    workType: "Full-time",
    salary: "$120k - $150k",
    type: "local",
    matchPercentage: 92,
    description: "We\'re looking for a senior frontend developer to join our growing team and help build the next generation of web applications using React and modern technologies.",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    postedDate: "2 days ago",
    applicantsCount: 45,
    isFeatured: true,
    isBookmarked: false
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: {
      name: "Global Innovations Ltd",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"
    },
    location: "Remote (Global)",
    workType: "Full-time",
    salary: "$90k - $130k",
    type: "international",
    matchPercentage: 87,
    description: "Join our international team to build scalable web applications that serve millions of users worldwide. Work with cutting-edge technologies in a remote-first environment.",
    skills: ["JavaScript", "Python", "Docker", "Kubernetes", "MongoDB"],
    postedDate: "1 day ago",
    applicantsCount: 78,
    isFeatured: false,
    isBookmarked: true
  },
  {
    id: 3,
    title: "React Developer - Contract",
    company: {
      name: "StartupHub Inc",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop"
    },
    location: "New York, NY",
    workType: "Contract",
    salary: "$80/hour",
    type: "contract",
    matchPercentage: 78,
    description: "3-month contract position to help build a new e-commerce platform. Perfect opportunity to work with a dynamic startup team and latest React technologies.",
    skills: ["React", "Redux", "CSS3", "REST APIs", "Git"],
    postedDate: "3 days ago",
    applicantsCount: 23,
    isFeatured: false,
    isBookmarked: false
  },
  {
    id: 4,
    title: "UI/UX Developer",
    company: {
      name: "Design Studios Pro",
      logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop"
    },
    location: "Austin, TX",
    workType: "Full-time",
    salary: "$85k - $110k",
    type: "local",
    matchPercentage: 85,
    description: "Create beautiful and intuitive user interfaces for our client projects. Work closely with designers and backend developers to deliver exceptional user experiences.",
    skills: ["React", "Figma", "CSS3", "JavaScript", "Responsive Design"],
    postedDate: "1 week ago",
    applicantsCount: 67,
    isFeatured: false,
    isBookmarked: false,
    applicationStatus: "applied"
  }];


  // Mock recent applications data
  const recentApplications = [
  {
    id: 1,
    jobId: 4,
    jobTitle: "UI/UX Developer",
    company: {
      name: "Design Studios Pro",
      logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop"
    },
    status: "shortlisted",
    appliedDate: "Oct 15, 2025",
    interviewDate: "Oct 22, 2025 at 2:00 PM"
  },
  {
    id: 2,
    jobId: 5,
    jobTitle: "Senior React Developer",
    company: {
      name: "Innovation Labs",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    },
    status: "viewed",
    appliedDate: "Oct 12, 2025"
  },
  {
    id: 3,
    jobId: 6,
    jobTitle: "Frontend Engineer",
    company: {
      name: "WebTech Solutions",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"
    },
    status: "applied",
    appliedDate: "Oct 10, 2025"
  },
  {
    id: 4,
    jobId: 7,
    jobTitle: "JavaScript Developer",
    company: {
      name: "CodeCraft Inc",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop"
    },
    status: "rejected",
    appliedDate: "Oct 8, 2025"
  }];


  const handleSubscriptionUpgrade = (type) => {
    setModalState({
      isOpen: true,
      jobType: type
    });
  };

  const handleSubscriptionManage = (type) => {
    // Navigate to subscription management
    window.location.href = '/subscription-management';
  };

  const handleJobBookmark = (jobId, isBookmarked) => {
    console.log(`Job ${jobId} bookmark status: ${isBookmarked}`);
    // Handle bookmark logic here
  };

  const handleJobApply = (jobId) => {
    const job = recommendedJobs?.find((j) => j?.id === jobId);
    if (job && !userData?.subscriptions?.[job?.type]?.isActive && !viewOnlyAccess?.[job?.type]) {
      setModalState({
        isOpen: true,
        jobType: job?.type
      });
    } else {
      console.log(`Applying to job ${jobId}`);
      // Handle job application logic here
    }
  };

  const handleModalUpgrade = (jobType) => {
    console.log(`Upgrading subscription for ${jobType}`);
    // Handle subscription upgrade logic here
    setModalState({ isOpen: false, jobType: null });
  };

  const handleModalSkip = (jobType) => {
    setViewOnlyAccess((prev) => ({
      ...prev,
      [jobType]: true
    }));
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'resume':console.log('Opening resume management');
        break;
      case 'alerts':console.log('Opening job alerts settings');
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  const getJobAccess = (job) => {
    return userData?.subscriptions?.[job?.type]?.isActive || viewOnlyAccess?.[job?.type];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="applicant"
        subscriptionStatus="active"
        isAuthenticated={true} />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {userData?.name}!
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your job search today.
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/profile-management">
                  <Button variant="outline" iconName="User" iconPosition="left">
                    View Profile
                  </Button>
                </Link>
                <Link href="/subscription-management">
                  <Button variant="default" iconName="Crown" iconPosition="left">
                    Manage Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Subscription Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SubscriptionCard
              type="local"
              isActive={userData?.subscriptions?.local?.isActive}
              expiryDate={userData?.subscriptions?.local?.expiryDate}
              onUpgrade={handleSubscriptionUpgrade}
              onManage={handleSubscriptionManage} />

            <SubscriptionCard
              type="international"
              isActive={userData?.subscriptions?.international?.isActive}
              expiryDate={userData?.subscriptions?.international?.expiryDate}
              onUpgrade={handleSubscriptionUpgrade}
              onManage={handleSubscriptionManage} />

            <SubscriptionCard
              type="contract"
              isActive={userData?.subscriptions?.contract?.isActive}
              expiryDate={userData?.subscriptions?.contract?.expiryDate}
              onUpgrade={handleSubscriptionUpgrade}
              onManage={handleSubscriptionManage} />

          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData?.map((stat, index) =>
            <StatsCard
              key={index}
              title={stat?.title}
              value={stat?.value}
              icon={stat?.icon}
              trend={stat?.trend}
              trendValue={stat?.trendValue}
              color={stat?.color} />

            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Job Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Recommended Jobs
                </h2>
                <Link href="/landing-page">
                  <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                    View All Jobs
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recommendedJobs?.map((job) =>
                <JobCard
                  key={job?.id}
                  job={job}
                  onBookmark={handleJobBookmark}
                  onApply={handleJobApply}
                  hasAccess={getJobAccess(job)} />

                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Applications */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Recent Applications
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {recentApplications?.map((application) =>
                  <ApplicationCard
                    key={application?.id}
                    application={application} />

                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" fullWidth>
                    View All Applications
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <QuickActions onAction={handleQuickAction} />

              {/* Job Alerts */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Job Alerts
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div>
                      <p className="text-sm font-medium text-foreground">Frontend Developer</p>
                      <p className="text-xs text-muted-foreground">5 new jobs today</p>
                    </div>
                    <Icon name="Bell" size={16} className="text-primary" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div>
                      <p className="text-sm font-medium text-foreground">React Developer</p>
                      <p className="text-xs text-muted-foreground">3 new jobs today</p>
                    </div>
                    <Icon name="Bell" size={16} className="text-primary" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" fullWidth iconName="Settings" iconPosition="left">
                    Manage Alerts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Manage Plan Modal */}
      <ManagePlanModal
        isOpen={modalState?.isOpen}
        onClose={() => setModalState({ isOpen: false, jobType: null })}
        jobType={modalState?.jobType}
        onUpgrade={handleModalUpgrade}
        onSkip={handleModalSkip} />

    </div>);

};

export default ApplicantDashboard;