/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: false, // Disable SWC minification to avoid unicode issues
};

export default nextConfig;