'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { getIcon } from '@/components/icons';

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    // Set cookie for locale
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    router.refresh(); // Refresh to pick up new locale
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center text-neutral-600">
        {getIcon('globe', 'w-4 h-4')}
      </div>
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="px-3 py-1 border border-neutral-300 rounded-md text-sm bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-neutral-100"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
