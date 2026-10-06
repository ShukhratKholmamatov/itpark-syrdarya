/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is served locally from /public
    remotePatterns: [],
  },
  // Allow larger payloads for CV uploads via server actions / route handlers
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
