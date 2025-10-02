'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const CTASection: React.FC = () => {
  const t = useTranslations('home');

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <Link
          href="/signup"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          {t('cta.button')}
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
