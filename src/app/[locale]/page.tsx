import {use} from 'react';
import {setRequestLocale} from 'next-intl/server';
import { 
  PublicLayout, 
  HeroSection, 
  FeaturesSection, 
  IntegrationsSection, 
  CTASection 
} from '@/components';

type Props = {
  params: Promise<{locale: string}>;
};

export default function HomePage({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

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