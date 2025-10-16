import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface AuthHeaderProps {
  type: 'login' | 'signup';
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ type }) => {
  const t = useTranslations('auth');

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
        <span className="text-white font-bold text-xl">O</span>
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
        {t(`${type}.title`)}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {t(`${type}.subtitle`)}{' '}
        <Link 
          href={type === 'login' ? '/signup' : '/login'} 
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          {t(type === 'login' ? 'login.createAccount' : 'signup.signInExisting')}
        </Link>
      </p>
    </div>
  );
};

