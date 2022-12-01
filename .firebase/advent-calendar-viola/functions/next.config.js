"use strict";

// next.config.js
var nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**"
      }
    ]
  }
};
http:
  module.exports = nextConfig;
