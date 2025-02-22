/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

    return [
      {
        source: '/api/v1/:path*', // Прокси всех запросов, которые начинаются с /api/v1
        destination: `${backendUrl}/api/v1/:path*`, // Адрес бэкенда
      },
    ];
  },
};

export default withNextIntl(nextConfig);
