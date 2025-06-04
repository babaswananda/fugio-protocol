/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental appDir as it's no longer experimental in Next.js 14
  transpilePackages: [
    '@fugio/shared',
    '@fugio/worldmodel',
    '@fugio/io-agent',
    '@fugio/augment-code',
    '@fugio/keto-code',
    '@fugio/alpha-router',
    '@fugio/codex-memory',
  ],
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
