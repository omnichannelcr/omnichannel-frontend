'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { pipelineMetrics } from '@/data/pipeline';
import { getIcon } from '@/components';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
  subtitle?: string;
  t: (key: string) => string;
}

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  subtitle,
  t
}: AnalyticsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-4 flex items-center">
          {changeType === 'increase' ? (
            getIcon('chevron-up', 'w-4 h-4 text-green-500 mr-1', 16)
          ) : (
            getIcon('chevron-down', 'w-4 h-4 text-red-500 mr-1', 16)
          )}
          <span className={`text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-500 ml-1">{t('vsLastMonth')}</span>
        </div>
      )}
    </div>
  );
};

interface ChartData {
  name: string;
  value: number;
  color: string;
}

export const PipelineAnalytics = () => {
  const t = useTranslations('pipeline.analyticsPage');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock chart data
  const conversionData: ChartData[] = [
    { name: 'New Leads', value: 45, color: '#3B82F6' },
    { name: 'Qualified', value: 25, color: '#F59E0B' },
    { name: 'Proposal', value: 15, color: '#8B5CF6' },
    { name: 'Negotiation', value: 10, color: '#F97316' },
    { name: 'Closed Won', value: 3, color: '#10B981' },
    { name: 'Closed Lost', value: 2, color: '#EF4444' }
  ];

  const sourceData: ChartData[] = [
    { name: 'Website', value: 35, color: '#3B82F6' },
    { name: 'Facebook', value: 25, color: '#1877F2' },
    { name: 'Instagram', value: 20, color: '#E4405F' },
    { name: 'Telegram', value: 15, color: '#0088CC' },
    { name: 'WhatsApp', value: 5, color: '#25D366' }
  ];

  const weeklyTrendData = pipelineMetrics.weeklyTrend;

  return (
    <div className="space-y-6">
      {/* Period Selector and Filters */}
      <div className="flex items-center justify-end space-x-3">
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7d">{t('last7Days')}</option>
          <option value="30d">{t('last30Days')}</option>
          <option value="90d">{t('last90Days')}</option>
          <option value="1y">{t('lastYear')}</option>
        </select>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          {getIcon('hash', 'w-4 h-4', 16)}
          <span>{t('filters')}</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title={t('totalPipelineValue')}
          value={`$${pipelineMetrics.monthlyRevenue.toLocaleString()}`}
          change={12.5}
          changeType="increase"
          icon={getIcon('wallet', 'w-6 h-6 text-blue-600', 24)}
          subtitle={t('activeOpportunities')}
          t={t}
        />
        <AnalyticsCard
          title={t('conversionRate')}
          value={`${pipelineMetrics.conversionRate}%`}
          change={2.1}
          changeType="increase"
          icon={getIcon('hash', 'w-6 h-6 text-green-600', 24)}
          subtitle={t('leadToCustomer')}
          t={t}
        />
        <AnalyticsCard
          title={t('averageDealSize')}
          value={`$${pipelineMetrics.averageDealValue.toLocaleString()}`}
          change={-1.2}
          changeType="decrease"
          icon={getIcon('bar-chart', 'w-6 h-6 text-purple-600', 24)}
          subtitle={t('perClosedDeal')}
          t={t}
        />
        <AnalyticsCard
          title={t('salesCycle')}
          value={`${pipelineMetrics.averageSalesCycle} days`}
          change={-8.3}
          changeType="increase"
          icon={getIcon('message-circle', 'w-6 h-6 text-orange-600', 24)}
          subtitle={t('averageTimeToClose')}
          t={t}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Stage Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Pipeline Distribution</h3>
            {getIcon('bar-chart', 'w-5 h-5 text-gray-400', 20)}
          </div>
          
          <div className="space-y-4">
            {conversionData.map((item, index) => (
              <div key={`conversion-${item.name}-${index}`} className="flex items-center justify-between" >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${item.value}%`, 
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
            {getIcon('bar-chart', 'w-5 h-5 text-gray-400', 20)}
          </div>
          
          <div className="space-y-4">
            {sourceData.map((item, index) => (
              <div key={`source-${item.name}-${index}`} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${item.value}%`, 
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Performance</h3>
            {getIcon('message-circle', 'w-5 h-5 text-gray-400', 20)}
          </div>
        
        <div className="grid grid-cols-4 gap-4">
          {weeklyTrendData.map((week, index) => (
            <div key={`week-${week.week}-${index}`} className="text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-2">{week.week}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{week.leads}</p>
                    <p className="text-xs text-gray-500">Leads</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-600">{week.conversions}</p>
                    <p className="text-xs text-gray-500">{t('conversions')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Top Performing Sources</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">Website</span>
                <span className="text-sm font-bold text-green-600">35%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-800">Facebook</span>
                <span className="text-sm font-bold text-blue-600">25%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                <span className="text-sm font-medium text-pink-800">Instagram</span>
                <span className="text-sm font-bold text-pink-600">20%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">{t('conversionOpportunities')}</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-yellow-800">Qualified Leads</span>
                <span className="text-sm font-bold text-yellow-600">25%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-800">Proposal Stage</span>
                <span className="text-sm font-bold text-purple-600">15%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium text-orange-800">Negotiation</span>
                <span className="text-sm font-bold text-orange-600">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

