/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Enable build caching
  experimental: {
    turbotrace: {
      logLevel: 'error',
    },
  },
};

export default nextConfig;