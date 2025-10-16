'use client';

import { PipelineAnalytics } from '@/components';
import { getIcon } from '@/components';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PipelineAnalyticsPage() {
  const t = useTranslations('pipeline.analyticsPage');
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link 
            href="/dashboard/pipeline"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            {getIcon('chevron-left', 'w-4 h-4', 16)}
            <span>{t('backToPipeline')}</span>
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
      </div>

      {/* Analytics Content */}
      <PipelineAnalytics />
    </div>
  );
}
