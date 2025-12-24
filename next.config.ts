// const withNextIntl = require('next-intl/plugin')();
import { NextConfig } from 'next';
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['admin.pricesmach.test', 'http://localhost:3002'],

  // Images configuration
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', // outputs JS modules for SVGs
      },
    },
  },
};

// export default withNextIntl(nextConfig);
export default nextConfig;
