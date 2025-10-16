'use client';

import React from 'react';
import { PublicNav } from '@/components';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <main>
        {children}
      </main>
    </div>
  );
};

