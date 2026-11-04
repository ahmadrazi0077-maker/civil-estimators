/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  async redirects() {
    return [
      // Branded quote URL used in marketing material -> the real quote page.
      { source: '/get-a-quote', destination: '/quote', permanent: true },
    ]
  },
}

module.exports = nextConfig
