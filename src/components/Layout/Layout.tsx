'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types/navigation';
import { Sidebar, MobileNav } from '@/components';
import { getIcon } from '@/components';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          user={user}
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            {getIcon('menu', 'w-6 h-6 text-neutral-600')}
          </button>

          {/* Spacer for desktop */}
          <div className="hidden lg:block"></div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-neutral-50">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        user={user}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};


