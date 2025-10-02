import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface GoogleAuthButtonProps {
  type: 'login' | 'signup';
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ type }) => {
  const t = useTranslations('auth');

  const handleGoogleAuth = () => {
    // TODO: Implement Google OAuth
    console.log(`Google ${type} clicked`);
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <Image src="/icons/google.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
      <span className="ml-2">
        {t(type === 'login' ? 'login.signInWithGoogle' : 'signup.signUpWithGoogle')}
      </span>
    </button>
  );
};

