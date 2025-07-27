/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      // For deployed environments - add your domain here
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.netlify.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'sbotech.in',
        pathname: '/uploads/**',
      },
      // Add API route pattern for EasyPanel
      {
        protocol: 'https',
        hostname: 'sbotech.in',
        pathname: '/api/uploads/**',
      },
    ],
  },
};

export default nextConfig;
