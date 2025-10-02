'use client';

import { useTranslations } from 'next-intl';

export default function CustomersPage() {
  const t = useTranslations('customers');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Customer management features coming soon...</p>
      </div>
    </div>
  );
}
