'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../../layout/AppIcon';
import Button from '../button/page';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = useState({
    users: false,
    jobs: false,
    system: false,
  });
  const pathname = usePathname();

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev?.[section],
    }));
  };

  const menuSections = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      path: '/admin/dashboard',
      items: [],
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      items: [
        // { label: 'All Users', path: '/admin/users', icon: 'UserCheck' },
        // { label: 'Employers', path: '/admin/employers', icon: 'Building2' },
        { label: 'Roles', path: '/admin/roles', icon: 'Shield' },
        { label: 'Jobseekers', path: '/admin/jobseeker', icon: 'User' },
      ],
    },
    {
      id: 'jobs',
      label: 'Job Management',
      icon: 'Briefcase',
      items: [
        // { label: 'All Jobs', path: '/job-details', icon: 'List' },
        { label: 'Work Categories', path: '/admin/categories', icon: 'Tag' },
        { label: 'Job Type', path: '/admin/jobType', icon: 'Job' },
        { label: 'Job Domain', path: '/admin/domain', icon: 'Domain' },
        { label: 'Countries', path: '/admin/countries', icon: 'Country' },
        { label: 'States', path: '/admin/states', icon: 'States' },
        { label: 'Qualification', path: '/admin/qualification', icon: 'Qualification' },
        // { label: 'Featured Jobs', path: '/admin/featured-jobs', icon: 'Star' },
        // { label: 'Job Reports', path: '/admin/job-reports', icon: 'FileText' },
      ],
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: 'CreditCard',
      path: '/subscription-management',
      items: [],
    },
    {
      id: 'system',
      label: 'System Settings',
      icon: 'Settings',
      items: [
        { label: 'General Settings', path: '/admin/settings', icon: 'Sliders' },
        { label: 'Email Templates', path: '/admin/email-templates', icon: 'Mail' },
        { label: 'Analytics', path: '/admin/analytics', icon: 'BarChart3' },
        { label: 'Audit Logs', path: '/admin/audit-logs', icon: 'FileSearch' },
      ],
    },
    {
      id: 'support',
      label: 'Support',
      icon: 'HelpCircle',
      items: [
        { label: 'Support Tickets', path: '/admin/support', icon: 'MessageSquare' },
        { label: 'FAQ Management', path: '/admin/faq', icon: 'HelpCircle' },
        { label: 'Documentation', path: '/admin/docs', icon: 'Book' },
      ],
    },
  ];

  const isActiveSection = (section) => {
    if (section?.path) return pathname === section?.path;
    return section?.items?.some((item) => pathname === item?.path);
  };

  const isActiveItem = (path) => pathname === path;

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-100 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
        }`}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-full justify-center"
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuSections?.map((section) => (
              <div key={section?.id}>
                {section?.items?.length > 0 ? (
                  // Expandable Section
                  <div>
                    <button
                      onClick={() => toggleSection(section?.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-md text-sm font-medium transition-micro ${isActiveSection(section)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                    >
                      <div className="flex items-center">
                        <Icon
                          name={section?.icon}
                          size={18}
                          className={isCollapsed ? '' : 'mr-3'}
                        />
                        {!isCollapsed && <span>{section?.label}</span>}
                      </div>
                      {!isCollapsed && (
                        <Icon
                          name="ChevronDown"
                          size={16}
                          className={`transition-transform ${expandedSections?.[section?.id] ? 'rotate-180' : ''
                            }`}
                        />
                      )}
                    </button>

                    {/* Submenu Items */}
                    {expandedSections?.[section?.id] && !isCollapsed && (
                      <div className="ml-6 mt-2 space-y-1">
                        {section?.items?.map((item) => (
                          <Link
                            key={item?.path}
                            href={item?.path}
                            className={`flex items-center p-2 rounded-md text-sm transition-micro ${isActiveItem(item?.path)
                              ? 'bg-accent text-accent-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                              }`}
                          >
                            <Icon name={item?.icon} size={16} className="mr-3" />
                            {item?.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Direct Link
                  <Link
                    href={section?.path}
                    className={`flex items-center p-3 rounded-md text-sm font-medium transition-micro ${isActiveSection(section)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                  >
                    <Icon
                      name={section?.icon}
                      size={18}
                      className={isCollapsed ? '' : 'mr-3'}
                    />
                    {!isCollapsed && <span>{section?.label}</span>}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'
              }`}
          >
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Shield" size={16} />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Admin Panel
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  System Administrator
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
