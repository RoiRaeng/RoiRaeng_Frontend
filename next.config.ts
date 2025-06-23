import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // devIndicators: {
  //   buildActivity: false,
  // },
  // swcMinify: true,
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
