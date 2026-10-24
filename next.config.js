/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
}

module.exports = nextConfig
