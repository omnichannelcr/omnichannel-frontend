'use client';

import { useState } from 'react';
import { Chat } from '@/types/leads';
import { getIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';

interface MobileChatViewProps {
  chat: Chat;
  onBack: () => void;
}

export default function MobileChatView({ chat, onBack }: MobileChatViewProps) {
  const [messageInput, setMessageInput] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const t = useTranslations();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return t('leads.today');
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isYesterday) {
      return t('leads.yesterday');
    }
    
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getSourceIcon = (source: string) => {
    const iconMap: { [key: string]: string } = {
      whatsapp: 'whatsapp',
      instagram: 'instagram',
      facebook: 'facebook',
      telegram: 'telegram',
      website: 'globe',
    };
    
    return getIcon(iconMap[source] || 'message-circle', undefined, 16);
  };

  const getSourceColor = (source: string) => {
    const colorMap: { [key: string]: string } = {
      whatsapp: 'bg-green-100 text-green-700',
      instagram: 'bg-pink-100 text-pink-700',
      facebook: 'bg-blue-100 text-blue-700',
      telegram: 'bg-blue-100 text-blue-700',
      website: 'bg-neutral-100 text-neutral-700',
    };
    
    return colorMap[source] || 'bg-neutral-100 text-neutral-700';
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      follow_up: 'bg-blue-100 text-blue-800',
      closed: 'bg-neutral-100 text-neutral-800',
    };
    
    return colorMap[status] || 'bg-neutral-100 text-neutral-800';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // TODO: Implement message sending
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Mobile Chat Header */}
      <div className="p-4 border-b border-neutral-200 bg-neutral-50">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            {/* Back button */}
            <button
              onClick={onBack}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              {getIcon('chevron-left', undefined, 24)}
            </button>
            
            {/* Avatar and Name */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={chat.lead.avatar}
                  alt={chat.lead.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {chat.lead.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(chat.lead.source)}`}>
                      {getSourceIcon(chat.lead.source)}
                      <span className="ml-1">{t(`sources.${chat.lead.source}`)}</span>
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chat.lead.status)}`}>
                      {t(`status.${chat.lead.status}`)}
                    </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info - Collapsible Panel on mobile */}
          <div className="rounded-lg">
            <div className="p-3">
              <div className="text-sm text-neutral-600 space-y-2">
                <p className="font-medium text-neutral-900">Contact Information</p>
                {showContactInfo && (
                  <>
                    <div>
                      <p className="font-medium text-neutral-700">Phone</p>
                      <p>{chat.lead.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-700">Email</p>
                      <p>{chat.lead.email}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Arrow dropdown button at bottom */}
            <div className="border-t border-neutral-200">
              <button
                onClick={() => setShowContactInfo(!showContactInfo)}
                className="w-full flex justify-center items-center py-3 hover:bg-neutral-100 transition-colors bg-neutral-50"
              >
                {getIcon('chevron-down', `text-neutral-700 transform transition-transform ${showContactInfo ? 'rotate-180' : 'rotate-0'}`, 24)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message, index) => {
          const isUser = message.sender === 'user';
          const prevMessage = index > 0 ? chat.messages[index - 1] : null;
          const showDate = !prevMessage || 
            new Date(message.timestamp).toDateString() !== new Date(prevMessage.timestamp).toDateString();

          return (
            <div key={message.id}>
              {/* Date separator */}
              {showDate && (
                <div className="flex justify-center mb-4">
                  <span className="bg-neutral-100 text-neutral-600 text-xs px-3 py-1 rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}

              {/* Message */}
              <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                  {/* Avatar (only for lead messages) */}
                  {!isUser && (
                    <img
                      src={chat.lead.avatar}
                      alt={chat.lead.name}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  
                  {/* Message bubble */}
                  <div className={`px-4 py-2 rounded-2xl ${
                    isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-neutral-100 text-neutral-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isUser ? 'text-blue-100' : 'text-neutral-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-50">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            {getIcon('paperclip', undefined, 20)}
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-neutral-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="button"
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            {getIcon('smile', undefined, 20)}
          </button>
          
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {getIcon('send', undefined, 20)}
          </button>
        </form>
      </div>
    </div>
  );
}
