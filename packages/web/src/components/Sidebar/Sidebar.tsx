'use client';

import React, { useState } from 'react';
import { NavItem, UserProfile } from '@/types/navigation';
import { navigationItems, bottomNavItems } from '@/data/loggedNavigation';
import { getIcon, LanguageSwitcher } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface SidebarProps {
  user: UserProfile;
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  isCollapsed = false, 
  onToggle,
  className = '' 
}) => {
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
      }
    };

    return (
      <div key={item.id}>
        <Link 
          href={item.href || '#'}
          onClick={handleClick}
          className={`
            flex items-center transition-all duration-200 group relative
            ${level > 0 ? 'ml-6' : ''}
            ${isCollapsed ? 'justify-center px-3 py-3 rounded-lg' : 'gap-3 px-4 py-3 rounded-lg'}
              ${isActive || isParentActive 
                ? 'bg-primary-500 text-white shadow-sm border-l-4 border-primary-400' 
                : 'text-neutral-700 hover:bg-neutral-100'
              }
          `}
        >
          <div className="flex-shrink-0">
            {getIcon(item.icon, `w-5 h-5 ${isActive || isParentActive ? 'text-white' : ''}`) || (
              <div className={`w-5 h-5 ${isActive || isParentActive ? 'text-white' : 'text-neutral-500'}`}>
                {item.icon}
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <>
              <span className={`font-medium ${isActive || isParentActive ? 'text-white' : 'text-neutral-700'}`}>
                {t(`navigation.${item.label}`)}
              </span>
              {hasChildren && (
                <div className="ml-auto">
                  {getIcon('chevron-up', `w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'} ${isActive || isParentActive ? 'text-white' : 'text-neutral-400'}`)}
                </div>
              )}
            </>
          )}
        </Link>

        {/* Render children */}
        {hasChildren && !isCollapsed && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`
        flex flex-col h-full transition-all duration-300
        bg-white border-r border-neutral-200        ${isCollapsed ? 'w-24' : 'w-64'}
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              {getIcon('hash', 'w-5 h-5 text-white')}
            </div>
            <span className="font-semibold text-neutral-900">
              Omnichannel
            </span>
          </div>
        )}
        
        {isCollapsed && (
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mx-auto">
            {getIcon('hash', 'w-5 h-5 text-white')}
          </div>
        )}

        {onToggle && (
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
        >
            {isCollapsed 
              ? getIcon('chevron-right', 'w-5 h-5 text-neutral-600')
              : getIcon('chevron-left', 'w-5 h-5 text-neutral-600')
            }
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map(item => renderNavItem(item))}
      </nav>

      {/* Language Switcher */}
      <div className="p-4 border-t border-neutral-200">
        <LanguageSwitcher />
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-neutral-200 space-y-2">
        {bottomNavItems.map(item => renderNavItem(item))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-neutral-200">
        {isCollapsed ? (
          <div className="flex justify-center">
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 truncate">
                {user.name}
              </p>
              <p className="text-sm text-neutral-500 truncate">
                {user.email}
              </p>
            </div>
            <button className="p-1 rounded-lg hover:bg-neutral-100 transition-colors">
              {getIcon('more-vertical', 'w-4 h-4 text-neutral-600')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


