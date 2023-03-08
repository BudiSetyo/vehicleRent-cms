/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  experimental: {
    appDir: false,
  },
  env: {
    API_URL: process.env.API,
    API_VRENT: process.env.API_VRENT,
  },
};

module.exports = nextConfig;
