'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import AdminSidebar from '@/components/shared/admin-sidebar/page';

export default function AdminLayout({ children }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const pathname = usePathname();

    // Routes where layout should not appear
    const noLayoutRoutes = ['/admin/login'];

    // If current route matches one of those, skip layout
    if (noLayoutRoutes.includes(pathname)) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header (always visible) */}
            <Header
                userRole="admin"
                subscriptionStatus="active"
                isAuthenticated={true}
            />

            {/* Sidebar */}
            <AdminSidebar
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Page Content */}
            <main
                className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'
                    }`}
            >
                <div className="p-6 max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
