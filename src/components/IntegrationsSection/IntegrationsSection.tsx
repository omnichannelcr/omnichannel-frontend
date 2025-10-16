import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { homeIntegrations } from '@/data/homeIntegrations';

export const IntegrationsSection: React.FC = () => {
  const t = useTranslations('home');

  return (
    <section id="integrations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('integrations.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('integrations.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {homeIntegrations.map((integration, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <div className="flex items-center justify-center mx-auto mb-4">
                <Image src={integration.icon} alt={integration.name} width={48} height={48} className="w-12 h-12" />
              </div>
              <h3 className="font-semibold text-gray-900">{integration.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

