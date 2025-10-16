import { PublicLayout, AuthHeader, LoginForm } from '@/components';

// This makes the page static
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function Login() {

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthHeader type="login" />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />
        </div>
      </div>
    </PublicLayout>
  );
}
