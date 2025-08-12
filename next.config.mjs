/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
      {
        protocol: 'https',
        hostname: 'sbotech.in',
        pathname: '/api/uploads/**',
      },
      // Supabase storage patterns
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
