'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CustomerFilters } from '@/types/customers';
import { getIcon } from '@/components';

interface CustomerSearchProps {
  filters: CustomerFilters;
  onFiltersChange: (filters: CustomerFilters) => void;
  onAddCustomer: () => void;
}

export const CustomerSearch: React.FC<CustomerSearchProps> = ({
  filters,
  onFiltersChange,
  onAddCustomer
}) => {
  const t = useTranslations('customers');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status });
  };

  const handlePriorityChange = (priority: string) => {
    onFiltersChange({ ...filters, priority });
  };

  const handleSourceChange = (source: string) => {
    onFiltersChange({ ...filters, source });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: '',
      priority: '',
      source: '',
      tags: []
    });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.source || filters.tags.length > 0;

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      {/* Search Bar and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {getIcon('search', 'w-5 h-5 text-gray-400', 20)}
            </div>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              showFilters || hasActiveFilters
                ? 'border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100'
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            {getIcon('hash', 'w-4 h-4 mr-2', 16)}
            {t('filters')}
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                {[filters.status, filters.priority, filters.source].filter(Boolean).length + filters.tags.length}
              </span>
            )}
          </button>

          <button
            onClick={onAddCustomer}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {getIcon('users', 'w-4 h-4 mr-2', 16)}
            {t('addCustomer')}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('status')}
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">{t('allStatuses')}</option>
              <option value="active">{t('statusOptions.active')}</option>
              <option value="prospect">{t('statusOptions.prospect')}</option>
              <option value="lead">{t('statusOptions.lead')}</option>
              <option value="inactive">{t('statusOptions.inactive')}</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('priority')}
              </label>
              <select
                value={filters.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">{t('allPriorities')}</option>
              <option value="high">{t('priorityOptions.high')}</option>
              <option value="medium">{t('priorityOptions.medium')}</option>
              <option value="low">{t('priorityOptions.low')}</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('source')}
              </label>
              <select
                value={filters.source}
                onChange={(e) => handleSourceChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">{t('allSources')}</option>
              <option value="website">{t('sourceOptions.website')}</option>
              <option value="referral">{t('sourceOptions.referral')}</option>
              <option value="social">{t('sourceOptions.social')}</option>
              <option value="email">{t('sourceOptions.email')}</option>
              <option value="phone">{t('sourceOptions.phone')}</option>
              <option value="event">{t('sourceOptions.event')}</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getIcon('chevron-left', 'w-4 h-4 mr-2', 16)}
                {t('clearFilters')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
