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
        destination: '/home?table=NTpidXJnZXItc2VjcmV0LWtleQ==',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
