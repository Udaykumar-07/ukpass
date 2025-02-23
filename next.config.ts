import type { NextConfig } from "next";
import 'dotenv/config'; // Force-load .env.local

const nextConfig = {
  experimental: {
    turbo: false, // Disable Turbopack
  },
  reactStrictMode: true,
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY, // Pass it explicitly
  },
};




export default nextConfig;

module.exports = nextConfig;

