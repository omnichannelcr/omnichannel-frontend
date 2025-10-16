'use client';

import { useTranslations } from 'next-intl';
import { CustomerStats as CustomerStatsType } from '@/types/customers';
import { getIcon } from '@/components';

interface CustomerStatsProps {
  stats: CustomerStatsType;
}

export const CustomerStats: React.FC<CustomerStatsProps> = ({ stats }) => {
  const t = useTranslations('customers');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    {
      id: 'total',
      title: t('stats.totalCustomers'),
      value: stats.total.toString(),
      icon: 'users',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'active',
      title: t('stats.activeCustomers'),
      value: stats.active.toString(),
      icon: 'check-circle',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'prospects',
      title: t('stats.prospects'),
      value: stats.prospects.toString(),
      icon: 'globe',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      id: 'leads',
      title: t('stats.leads'),
      value: stats.leads.toString(),
      icon: 'folder',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'totalValue',
      title: t('stats.totalValue'),
      value: formatCurrency(stats.totalValue),
      icon: 'wallet',
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      id: 'averageValue',
      title: t('stats.averageValue'),
      value: formatCurrency(stats.averageValue),
      icon: 'bar-chart',
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards.map((stat) => (
        <div key={stat.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex-shrink-0 ${stat.bgColor} rounded-md p-2`}>
                {getIcon(stat.icon, `w-5 h-5 ${stat.textColor}`, 20)}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 leading-tight">
                {stat.title}
              </p>
              <p className="text-xl font-bold text-gray-900 truncate">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
