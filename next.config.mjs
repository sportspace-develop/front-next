/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

    return [
      {
        source: '/api/v1/:path*', // Прокси всех запросов, которые начинаются с /api/v1
        destination: `${backendUrl}/api/v1/:path*`, // Адрес бэкенда
      },
    ];
  },
};

export default nextConfig;