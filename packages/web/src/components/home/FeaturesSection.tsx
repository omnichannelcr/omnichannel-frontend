'use client';

import { useTranslations } from 'next-intl';
import { getIcon } from '@/components/icons';
import { homeFeatures } from '@/data/features';

const FeaturesSection: React.FC = () => {
  const t = useTranslations('home');

  const features = homeFeatures.map(feature => ({
    icon: feature.icon,
    title: t(feature.titleKey as any),
    description: t(feature.descriptionKey as any)
  }));

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-center mx-auto mb-4">
                {getIcon(feature.icon, 'w-24 h-24 text-blue-600', 96)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
