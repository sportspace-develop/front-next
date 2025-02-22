import { getRequestConfig } from 'next-intl/server';

import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../../public/locales/${locale}/common.json`)).default,
      ...(await import(`../../public/locales/${locale}/auth.json`)).default,
    },
  };
});
