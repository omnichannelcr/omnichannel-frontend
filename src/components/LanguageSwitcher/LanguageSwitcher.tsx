'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';
import { routing } from '@/i18n/routing';
import { getIcon } from '@/components';

const languageNames = {
  en: 'English',
  es: 'Español', 
  fr: 'Français'
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const languages = routing.locales;

  const currentLanguage = languages.find(lang => lang === locale) || languages[1]; // Default to Spanish

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    // Validate locale
    if (!routing.locales.includes(newLocale as typeof routing.locales[number])) return;
    
    // Use the i18n router to navigate to the same pathname with the new locale
    router.replace(pathname, {locale: newLocale});
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Selector Button - Only Flag */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 bg-white rounded-md border border-neutral-300 hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {getIcon('globe', 'w-5 h-5 text-neutral-500')}
        <span className="text-md text-neutral-500">{currentLanguage}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 w-fit bg-white rounded-lg shadow-lg border border-neutral-200 z-20">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-blue-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  language === locale ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded uppercase">
                    {language}
                  </span>
                  <span className="text-sm font-medium text-neutral-800">
                    {languageNames[language as keyof typeof languageNames]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
