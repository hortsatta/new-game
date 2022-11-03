/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        pathname: '/media/games/**',
      },
    ],
  },
};

module.exports = nextConfig;
