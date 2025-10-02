'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { NavItem, UserProfile } from '@/types/navigation';
import { navigationItems, bottomNavItems } from '@/data/loggedNavigation';
import { getIcon } from '@/components';
import { generateAvatar, getAvatarBorderClass } from '@/utils/avatars';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface MobileNavProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ user, isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['customers']);
  const pathname = usePathname();
  const t = useTranslations();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = item.href === pathname;
    const isParentActive = hasChildren && item.children?.some(child => child.href === pathname);

    const handleClick = () => {
      if (hasChildren) {
        toggleExpanded(item.id);
      } else {
        onClose();
      }
    };

    return (
      <div key={item.id}>
        <Link 
          href={item.href || '#'}
          onClick={handleClick}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${level > 0 ? 'ml-6' : ''}
            ${isActive || isParentActive 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {getIcon(item.icon, `w-5 h-5 ${isActive || isParentActive ? 'text-white' : 'text-gray-600'}`)}
          <span className={`font-medium ${isActive || isParentActive ? 'text-white' : 'text-gray-700'}`}>
            {t(`navigation.${item.label}`)}
          </span>
          {hasChildren && (
            <div className="ml-auto">
              {getIcon('chevron-up', `w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'} ${isActive || isParentActive ? 'text-white' : 'text-gray-400'}`)}
            </div>
          )}
        </Link>

        {/* Render children */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Navigation */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:hidden
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                {getIcon('hash', 'w-5 h-5 text-white')}
              </div>
              <span className="font-semibold text-neutral-900">Omnichannel</span>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {getIcon('menu', 'w-5 h-5 text-neutral-600')}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map(item => renderNavItem(item))}
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 border-t border-neutral-200 space-y-2">
            {bottomNavItems.map(item => renderNavItem(item))}
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <Image
                src={generateAvatar(user.name)}
                alt={user.name}
                width={40}
                height={40}
                className={`w-10 h-10 rounded-full object-cover ${getAvatarBorderClass(user.name)}`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
              <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                {getIcon('more-vertical', 'w-4 h-4 text-gray-600')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


