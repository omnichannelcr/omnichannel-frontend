'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Customer } from '@/types/customers';
import { getIcon, Modal } from '@/components';
import { generateAvatar, getAvatarBorderClass } from '@/utils/avatars';

interface CustomerDetailProps {
  customer: Customer | null;
  isOpen: boolean;
  onEdit: (customer: Customer) => void;
  onClose: () => void;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  isOpen,
  onEdit,
  onClose
}) => {
  const t = useTranslations('customers');

  if (!isOpen || !customer) return null;

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
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return 'message-circle';
      case 'phone':
        return 'phone';
      case 'whatsapp':
        return 'whatsapp';
      case 'telegram':
        return 'telegram';
      case 'instagram':
        return 'instagram';
      case 'facebook':
        return 'facebook';
      default:
        return 'message-circle';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email_sent':
      case 'email_received':
        return 'message-circle';
      case 'call_made':
      case 'call_received':
        return 'message-circle';
      case 'meeting':
        return 'users';
      case 'note_added':
        return 'message-circle';
      case 'status_changed':
        return 'settings';
      case 'deal_created':
        return 'wallet';
      default:
        return 'message-circle';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={false}
    >
      {/* Custom Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={generateAvatar(customer.name)}
              alt={customer.name}
              width={64}
              height={64}
              className={`h-16 w-16 rounded-full object-cover ${getAvatarBorderClass(customer.name)}`}
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
              <p className="text-gray-600">{customer.position} at {customer.company}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                  {t(`statusOptions.${customer.status}`)}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(customer.priority)}`}>
                  {customer.priority} priority
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(customer)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              {getIcon('settings', 'w-4 h-4', 16)}
              <span>{t('edit')}</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              {getIcon('close', 'w-5 h-5', 20)}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('basicInformation')}</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">{t('email')}:</span>
                <p className="text-sm text-gray-900">{customer.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">{t('phone')}:</span>
                <p className="text-sm text-gray-900">{customer.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">{t('source')}:</span>
                <p className="text-sm text-gray-900 capitalize">{customer.source}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">{t('totalValue')}:</span>
                <p className="text-sm font-bold text-green-600">{formatCurrency(customer.totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('timeline')}</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">{t('created')}:</span>
                <p className="text-sm text-gray-900">{formatDate(customer.createdAt)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">{t('lastContact')}:</span>
                <p className="text-sm text-gray-900">
                  {customer.lastContact ? formatDate(customer.lastContact) : t('never')}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">{t('nextFollowUp')}:</span>
                <p className="text-sm text-gray-900">
                  {customer.nextFollowUp ? formatDate(customer.nextFollowUp) : t('notScheduled')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {customer.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('tags')}</h3>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Communication Channels */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('communicationChannels')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.communicationChannels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    channel.isVerified ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {getIcon(
                      getChannelIcon(channel.type),
                      `w-4 h-4 ${channel.isVerified ? 'text-green-600' : 'text-gray-400'}`,
                      16
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">{channel.type}</p>
                    <p className="text-sm text-gray-600">{channel.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {channel.isPrimary && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {t('primary')}
                    </span>
                  )}
                  {channel.isVerified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {t('verified')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        {customer.address && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('address')}</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-900">
                {customer.address.street}<br />
                {customer.address.city}, {customer.address.state} {customer.address.zipCode}<br />
                {customer.address.country}
              </p>
            </div>
          </div>
        )}

        {/* Recent Notes */}
        {customer.notes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('recentNotes')}</h3>
            <div className="space-y-3">
              {customer.notes.slice(0, 3).map((note) => (
                <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-2">{note.content}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{note.createdBy}</span>
                        <span>•</span>
                        <span>{formatDate(note.createdAt)}</span>
                        <span>•</span>
                        <span className="capitalize">{note.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activities */}
        {customer.activities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('recentActivities')}</h3>
            <div className="space-y-3">
              {customer.activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getIcon(getActivityIcon(activity.type), 'w-4 h-4 text-blue-600', 16)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <span>{activity.performedBy}</span>
                      <span>•</span>
                      <span>{formatDate(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
