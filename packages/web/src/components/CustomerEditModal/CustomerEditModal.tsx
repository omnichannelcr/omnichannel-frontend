'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Customer, CommunicationChannel } from '@/types/customers';
import { getIcon, Modal } from '@/components';
import { generateAvatar, getAvatarBorderClass } from '@/utils/avatars';

interface CustomerEditModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  isNew?: boolean;
}

export const CustomerEditModal: React.FC<CustomerEditModalProps> = ({
  customer,
  isOpen,
  onClose,
  onSave,
  isNew = false
}) => {
  const t = useTranslations('customers');
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else if (isNew) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        status: 'lead',
        priority: 'medium',
        source: 'website',
        tags: [],
        communicationChannels: [],
        notes: [],
        activities: [],
        totalValue: 0
      });
    }
    setErrors({});
  }, [customer, isNew, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = t('validation.nameRequired');
    }

    if (!formData.email?.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = t('validation.phoneRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const customerData: Customer = {
      id: customer?.id || Date.now().toString(),
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      company: formData.company,
      position: formData.position,
      status: formData.status || 'lead',
      priority: formData.priority || 'medium',
      source: formData.source || 'website',
      tags: formData.tags || [],
      createdAt: customer?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastContact: formData.lastContact,
      nextFollowUp: formData.nextFollowUp,
      totalValue: formData.totalValue || 0,
      communicationChannels: formData.communicationChannels || [],
      notes: formData.notes || [],
      activities: formData.activities || [],
      address: formData.address,
      socialProfiles: formData.socialProfiles
    };

    onSave(customerData);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean | string[] | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addCommunicationChannel = () => {
    const newChannel: CommunicationChannel = {
      id: Date.now().toString(),
      type: 'email',
      value: '',
      isPrimary: false,
      isVerified: false
    };

    setFormData(prev => ({
      ...prev,
      communicationChannels: [...(prev.communicationChannels || []), newChannel]
    }));
  };

  const updateCommunicationChannel = (index: number, field: string, value: string | boolean) => {
    const channels = [...(formData.communicationChannels || [])];
    channels[index] = { ...channels[index], [field]: value };
    setFormData(prev => ({ ...prev, communicationChannels: channels }));
  };

  const removeCommunicationChannel = (index: number) => {
    const channels = [...(formData.communicationChannels || [])];
    channels.splice(index, 1);
    setFormData(prev => ({ ...prev, communicationChannels: channels }));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'basic', label: t('tabs.basicInfo'), icon: 'users' },
    { id: 'contact', label: t('tabs.contactInfo'), icon: 'message-circle' },
    { id: 'details', label: t('tabs.additionalDetails'), icon: 'settings' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? t('addNewCustomer') : t('editCustomer')}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
            {/* Customer Info */}
            <div className="flex items-center space-x-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
              {formData.name && (
                <Image
                  src={generateAvatar(formData.name)}
                  alt={formData.name}
                  width={48}
                  height={48}
                  className={`h-12 w-12 rounded-full object-cover ${getAvatarBorderClass(formData.name || 'User')}`}
                />
              )}
              <div>
                <p className="text-sm text-gray-500">
                  {isNew ? t('addCustomerDescription') : t('editCustomerDescription')}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {getIcon(tab.icon, 'w-4 h-4', 16)}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('name')} *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={t('namePlaceholder')}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={t('emailPlaceholder')}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('phone')} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={t('phonePlaceholder')}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('company')}
                    </label>
                    <input
                      type="text"
                      value={formData.company || ''}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('companyPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('position')}
                    </label>
                    <input
                      type="text"
                      value={formData.position || ''}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('positionPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('status')}
                    </label>
                    <select
                      value={formData.status || 'lead'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="lead">{t('statusOptions.lead')}</option>
                      <option value="prospect">{t('statusOptions.prospect')}</option>
                      <option value="active">{t('statusOptions.active')}</option>
                      <option value="inactive">{t('statusOptions.inactive')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('priority')}
                    </label>
                    <select
                      value={formData.priority || 'medium'}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">{t('priorityOptions.low')}</option>
                      <option value="medium">{t('priorityOptions.medium')}</option>
                      <option value="high">{t('priorityOptions.high')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('source')}
                    </label>
                    <select
                      value={formData.source || 'website'}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="website">{t('sourceOptions.website')}</option>
                      <option value="referral">{t('sourceOptions.referral')}</option>
                      <option value="social">{t('sourceOptions.social')}</option>
                      <option value="email">{t('sourceOptions.email')}</option>
                      <option value="phone">{t('sourceOptions.phone')}</option>
                      <option value="event">{t('sourceOptions.event')}</option>
                    </select>
                  </div>
                </div>
                </div>
              )}

              {/* Contact Information Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{t('communicationChannels')}</h4>
                      <button
                        type="button"
                        onClick={addCommunicationChannel}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {getIcon('users', 'w-4 h-4 mr-2', 16)}
                        {t('addChannel')}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.communicationChannels?.map((channel, index) => (
                        <div key={channel.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <select
                            value={channel.type}
                            onChange={(e) => updateCommunicationChannel(index, 'type', e.target.value)}
                            className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="telegram">Telegram</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                          </select>

                          <input
                            type="text"
                            value={channel.value}
                            onChange={(e) => updateCommunicationChannel(index, 'value', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder={t('channelValuePlaceholder')}
                          />

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={channel.isPrimary}
                              onChange={(e) => updateCommunicationChannel(index, 'isPrimary', e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{t('primary')}</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => removeCommunicationChannel(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            {getIcon('chevron-left', 'w-4 h-4', 16)}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('totalValue')}
                    </label>
                    <input
                      type="number"
                      value={formData.totalValue || 0}
                      onChange={(e) => handleInputChange('totalValue', parseFloat(e.target.value) || 0)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tags')}
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder={t('addTagPlaceholder')}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('nextFollowUp')}
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.nextFollowUp ? new Date(formData.nextFollowUp).toISOString().slice(0, 16) : ''}
                        onChange={(e) => handleInputChange('nextFollowUp', e.target.value ? new Date(e.target.value).toISOString() : '')}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 flex items-center justify-end space-x-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isNew ? t('createCustomer') : t('saveChanges')}
              </button>
            </div>
          </form>
    </Modal>
  );
};
