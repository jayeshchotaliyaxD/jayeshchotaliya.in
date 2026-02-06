/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
}

module.exports = nextConfig
