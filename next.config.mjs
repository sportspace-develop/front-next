/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*', // Прокси всех запросов, которые начинаются с /api/v1
        destination: 'http://localhost:8080/api/v1/:path*', // Адрес бэкенда
      },
    ];
  },
};

export default nextConfig;
