'use client';

import { useState } from 'react';
import { mockChats } from '@/data/leads';
import { Chat } from '@/types/leads';
import { ChatList, MobileChatView, DesktopChatView } from '@/components';
import { useTranslations } from 'next-intl';

export default function LeadsPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showChatView, setShowChatView] = useState(false);
  const t = useTranslations('leads');

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setShowChatView(true);
  };

  const handleBackToList = () => {
    setShowChatView(false);
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Mobile Layout - Full width, show either list or chat view */}
      <div className="block md:hidden h-full">
        {!showChatView ? (
          <ChatList 
            chats={mockChats} 
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
          />
        ) : (
          selectedChat && (
            <MobileChatView 
              chat={selectedChat} 
              onBack={handleBackToList}
            />
          )
        )}
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden md:flex h-full">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 bg-white">
          <ChatList 
            chats={mockChats} 
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        </div>

        {/* Chat View */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <DesktopChatView chat={selectedChat} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('selectConversation')}
                </h3>
                <p className="text-gray-500">
                  {t('selectConversationDescription')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}