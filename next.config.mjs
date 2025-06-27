/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  // Ensure API routes are handled as Server Components
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
