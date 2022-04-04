
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
    publicRuntimeConfig: {
      KYE: process.env.CLOUD_KEY,
      NAME: process.env.CLOUD_NAME,
    },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
