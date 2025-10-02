'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getIcon } from '../icons';
import { publicNavigationItems, authItems } from '@/data/publicNavigation';
import LanguageSwitcher from '../LanguageSwitcher';

const PublicNav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900">OmniChannel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {publicNavigationItems.map((item) => (
              <Link 
                key={item.id}
                href={item.href} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t(item.labelKey as any)}
              </Link>
            ))}
          </div>

          {/* Auth Buttons and Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link
              href={authItems.login.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t(authItems.login.labelKey as any)}
            </Link>
            <Link
              href={authItems.signup.href}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {t(authItems.signup.labelKey as any)}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {getIcon('menu', 'w-6 h-6 text-gray-600')}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {publicNavigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.labelKey as any)}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <div className="pb-2">
                  <LanguageSwitcher />
                </div>
                <Link
                  href={authItems.login.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(authItems.login.labelKey as any)}
                </Link>
                <Link
                  href={authItems.signup.href}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(authItems.signup.labelKey as any)}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNav;
