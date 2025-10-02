import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get('locale')?.value || 'es';

  try {
    // Try to load the new modular structure first
    const messages = (await import(`../../messages/${locale}/index.ts`)).default;
    return {
      locale,
      messages
    };
  } catch {
    // Fallback to the old single file structure
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {
      locale,
      messages
    };
  }
});
