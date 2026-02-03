
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'maldives-serenitytravels.com' }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
