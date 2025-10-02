'use client';

import React from 'react';
import PublicNav from './PublicNav';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <main>
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
