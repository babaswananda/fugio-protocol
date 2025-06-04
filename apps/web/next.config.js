/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
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
