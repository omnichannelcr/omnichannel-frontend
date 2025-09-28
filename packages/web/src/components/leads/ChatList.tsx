'use client';

import { Chat } from '@/types/leads';
import { getIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export default function ChatList({ chats, selectedChat, onSelectChat }: ChatListProps) {
  const t = useTranslations();
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
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
      whatsapp: 'text-green-600',
      instagram: 'text-pink-600',
      facebook: 'text-blue-600',
      telegram: 'text-blue-500',
      website: 'text-neutral-600',
    };
    
    return colorMap[source] || 'text-neutral-600';
  };

  return (
    <div 
      className="flex flex-col h-full bg-neutral-50"
    >
      {/* Header */}
      <div className="p-4 border-b bg-white border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900">
          {t('leads.title')}
        </h2>
        <p className="text-sm mt-1 text-neutral-500">
          {chats.length} {t('leads.subtitle')}
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-neutral-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getIcon('search', 'text-neutral-400', 16)}
          </div>
          <input
            type="text"
            placeholder={t('leads.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white border-neutral-300"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-neutral-500">
            {getIcon('message-circle', 'text-neutral-300 mb-4', 48)}
            <p className="text-sm">{t('leads.noConversations')}</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {chats.map((chat) => {
              const isSelected = selectedChat?.id === chat.id;
              const lastMessage = chat.messages[chat.messages.length - 1];
              
              return (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  className={`
                    p-4 cursor-pointer transition-colors
                    ${isSelected 
                      ? 'bg-primary-50 border-r-2 border-primary-500' 
                      : 'bg-white hover:bg-neutral-100'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={chat.lead.avatar}
                        alt={chat.lead.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {/* Source indicator */}
                      <div className={`absolute -bottom-1 -right-1 ${getSourceColor(chat.lead.source)}`}>
                        {getSourceIcon(chat.lead.source)}
                      </div>
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium truncate ${isSelected ? 'text-primary-900' : 'text-neutral-900'}`}>
                          {chat.lead.name}
                        </h3>
                        <span className="text-xs flex-shrink-0 ml-2 text-neutral-500">
                          {formatTime(chat.updatedAt)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-sm truncate ${isSelected ? 'text-primary-700' : 'text-neutral-500'}`}>
                          {lastMessage?.content || t('leads.noMessagesYet')}
                        </p>
                        
                        {/* Unread indicator */}
                        {chat.lead.unreadCount > 0 && (
                          <div className="flex-shrink-0 ml-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary-600 rounded-full">
                              {chat.lead.unreadCount > 9 ? '9+' : chat.lead.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {chat.lead.tags && chat.lead.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {chat.lead.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700"
                            >
                              {tag}
                            </span>
                          ))}
                          {chat.lead.tags.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                              +{chat.lead.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
