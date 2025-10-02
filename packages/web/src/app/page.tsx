import { 
  PublicLayout, 
  HeroSection, 
  FeaturesSection, 
  IntegrationsSection, 
  CTASection 
} from '@/components';

// This makes the page static
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

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