import { IntegrationCard } from '@/components';
import { integrations } from '@/data/integrations';
import { useTranslations } from 'next-intl';

// This makes the page static
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function IntegrationsPage() {
  const t = useTranslations('integrations');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
          />
        ))}
      </div>
    </div>
  );
}