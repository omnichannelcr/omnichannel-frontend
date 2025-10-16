'use client';

import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

interface LanguagePillsProps {
  className?: string;
  onLanguageChange?: () => void;
}

const languageNames = {
  en: 'English',
  es: 'Español', 
  fr: 'Français'
};

export function LanguagePills({ className = '', onLanguageChange }: LanguagePillsProps) {
  const locale = useLocale();

  const handleLanguageChange = (lang: string) => {
    const pathname = window.location.pathname.replace(/^\/[a-z]{2}/, '') || '/';
    window.location.href = `/${lang}${pathname}`;
    
    // Call the optional callback if provided
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  return (
    <div className={`w-full flex gap-1 ${className}`}>
      {routing.locales.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`flex-1 px-2 py-2 text-sm font-medium rounded-lg border transition-colors ${
            locale === lang 
              ? 'bg-blue-600 text-white border-blue-700' 
              : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
          }`}
        >
          {languageNames[lang as keyof typeof languageNames]}
        </button>
      ))}
    </div>
  );
}
