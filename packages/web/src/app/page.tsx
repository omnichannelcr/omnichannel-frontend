'use client';

import PublicLayout from '@/components/publicNavigation/PublicLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import IntegrationsSection from '@/components/home/IntegrationsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <PublicLayout>
      <div className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <IntegrationsSection />
        <CTASection />
      </div>
    </PublicLayout>
  );
}