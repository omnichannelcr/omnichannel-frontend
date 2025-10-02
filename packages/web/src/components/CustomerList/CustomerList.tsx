'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Customer } from '@/types/customers';
import { getIcon } from '@/components';
import { generateAvatar, getAvatarBorderClass } from '@/utils/avatars';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  selectedCustomerId?: string;
}

export const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onSelectCustomer,
  onEditCustomer,
  selectedCustomerId
}) => {
  const t = useTranslations('customers');

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'prospect':
        return 'bg-blue-100 text-blue-800';
      case 'lead':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Customer['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          {getIcon('users', 'w-12 h-12 text-gray-400', 48)}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noCustomersFound')}</h3>
        <p className="text-gray-500">{t('noCustomersDescription')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('customer')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('company')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('priority')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('totalValue')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('lastContact')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('channels')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className={`hover:bg-gray-50 cursor-pointer ${
                  selectedCustomerId === customer.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => onSelectCustomer(customer)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        src={generateAvatar(customer.name)}
                        alt={customer.name}
                        width={40}
                        height={40}
                        className={`h-10 w-10 rounded-full object-cover ${getAvatarBorderClass(customer.name)}`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.company}</div>
                  <div className="text-sm text-gray-500">{customer.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                    {t(`statusOptions.${customer.status}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center ${getPriorityColor(customer.priority)}`}>
                    {getIcon('chevron-up', 'w-4 h-4 mr-1', 16)}
                    <span className="text-sm font-medium capitalize">{customer.priority}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(customer.totalValue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.lastContact ? formatDate(customer.lastContact) : t('never')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {customer.communicationChannels.slice(0, 3).map((channel) => (
                      <div
                        key={channel.id}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          channel.isVerified ? 'bg-green-100' : 'bg-gray-100'
                        }`}
                        title={`${channel.type}: ${channel.value}`}
                      >
                        {getIcon(
                          channel.type === 'email' ? 'message-circle' : 
                          channel.type === 'phone' ? 'phone' : 
                          channel.type,
                          `w-3 h-3 ${channel.isVerified ? 'text-green-600' : 'text-gray-400'}`,
                          12
                        )}
                      </div>
                    ))}
                    {customer.communicationChannels.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-600">
                          +{customer.communicationChannels.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCustomer(customer);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    {getIcon('settings', 'w-4 h-4', 16)}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCustomer(customer);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {getIcon('chevron-right', 'w-4 h-4', 16)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
