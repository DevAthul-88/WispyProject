/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    KYE: process.env.CLOUD_KEY,
    NAME: process.env.CLOUD_NAME,
  },
};

module.exports = nextConfig;
