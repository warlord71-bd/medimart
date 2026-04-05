/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'medimart.com.bd' },
      { protocol: 'https', hostname: '**.medimart.com.bd' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  env: {
    SITE_NAME: 'MediMart',
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://medimart.com.bd',
  },
};

module.exports = nextConfig;
