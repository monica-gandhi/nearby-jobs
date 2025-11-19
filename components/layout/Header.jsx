'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Icon from './AppIcon';
import Button from '../shared/button/page';
import { useAuthActions } from '@/common/hooks/useAuthActions';
const Header = ({ userRole = null, subscriptionStatus = 'active', isAuthenticated = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { logoutUser } = useAuthActions();

  const location = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
  };

  const getNavigationItems = () => {
    if (!isAuthenticated) {
      return [
        { label: 'Jobs', path: '/', icon: 'Briefcase' },
        { label: 'For Employers', path: '/employer-dashboard', icon: 'Building2' },
        { label: 'Sign In', path: '/user-login', icon: 'LogIn' },
        { label: 'Sign Up', path: '/user-registration', icon: 'UserPlus' },
      ];
    }

    switch (userRole) {
      case 'applicant':
        return [
          { label: 'Dashboard', path: '/applicant-dashboard', icon: 'LayoutDashboard' },
          { label: 'Jobs', path: '/', icon: 'Briefcase' },
          { label: 'Profile', path: '/profile-management', icon: 'User' },
          { label: 'Subscription', path: '/subscription-management', icon: 'CreditCard' },
        ];
      case 'employer':
        return [
          { label: 'Dashboard', path: '/employer-dashboard', icon: 'LayoutDashboard' },
          { label: 'Post Job', path: '/job-details', icon: 'Plus' },
          { label: 'Profile', path: '/profile-management', icon: 'Building2' },
          { label: 'Subscription', path: '/subscription-management', icon: 'CreditCard' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
          { label: 'Users', path: '/profile-management', icon: 'Users' },
          { label: 'Jobs', path: '/job-details', icon: 'Briefcase' },
          { label: 'Subscriptions', path: '/subscription-management', icon: 'CreditCard' },
        ];
      default:
        return [
          { label: 'Jobs', path: '/', icon: 'Briefcase' },
          { label: 'Sign In', path: '/user-login', icon: 'LogIn' },
        ];
    }
  };

  const navigationItems = getNavigationItems();
  const visibleItems = navigationItems?.slice(0, 4);
  const moreItems = navigationItems?.slice(4);

  const Logo = () => (
    <Link href="/landing-page" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
        <Icon name="Briefcase" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">JobEazy</span>
    </Link>
  );

  const SubscriptionBadge = () => {
    if (!isAuthenticated || subscriptionStatus === 'active') return null;

    return (
      <div className="hidden md:flex items-center px-3 py-1 bg-warning/10 border border-warning/20 rounded-md">
        <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
        <span className="text-sm text-warning font-medium">
          {subscriptionStatus === 'expired' ? 'Subscription Expired' : 'Upgrade Required'}
        </span>
      </div>
    );
  };

  const UserMenu = () => {
    if (!isAuthenticated) return null;

    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Icon name="User" size={16} />
          </div>
          <Icon name="ChevronDown" size={16} />
        </Button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-elevation-2 z-150">
            <div className="py-1">
              <Link
                href="/profile-management"
                className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Icon name="User" size={16} className="mr-3" />
                Profile
              </Link>
              <Link
                href="/subscription-management"
                className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Icon name="CreditCard" size={16} className="mr-3" />
                Subscription
              </Link>
              <hr className="my-1 border-border" />
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro"
              >
                <Icon name="LogOut" size={16} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {visibleItems?.map((item) => (
              <Link
                key={item?.path}
                href={item?.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-micro ${location === item?.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.label}
              </Link>
            ))}

            {moreItems?.length > 0 && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center"
                >
                  <Icon name="MoreHorizontal" size={16} className="mr-2" />
                  More
                </Button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-elevation-2 z-150">
                    <div className="py-1">
                      {moreItems?.map((item) => (
                        <Link
                          key={item?.path}
                          href={item?.path}
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon name={item?.icon} size={16} className="mr-3" />
                          {item?.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <SubscriptionBadge />
            <UserMenu />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-2 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-micro ${location === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={16} className="mr-3" />
                  {item?.label}
                </Link>
              ))}

              {subscriptionStatus !== 'active' && isAuthenticated && (
                <div className="px-3 py-2 mt-2 bg-warning/10 border border-warning/20 rounded-md mx-3">
                  <div className="flex items-center">
                    <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
                    <span className="text-sm text-warning font-medium">
                      {subscriptionStatus === 'expired' ? 'Subscription Expired' : 'Upgrade Required'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;