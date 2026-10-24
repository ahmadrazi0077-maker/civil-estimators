import Head from 'next/head';
import { useRouter } from 'next/router';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://civil-estimators.vercel.app';
const OG_LOCALES = { en: 'en_US', ar: 'ar_EG', es: 'es_ES' };
const LOCALE_CODES = ['en', 'ar', 'es'];

function localeUrl(locale, cleanPath) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  if (cleanPath === '/' || cleanPath === '') {
    return `${BASE_URL}${prefix}/`;
  }
  return `${BASE_URL}${prefix}${cleanPath}`;
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website'
}) {
  const router = useRouter();
  const locale = router.locale || 'en';

  const siteTitle = title ? `${title} | CivilPro Services` : 'CivilPro Services';
  const siteDescription = description || 'Professional Civil Engineering Services - Steel Detailing, Rebar Detailing, Quantity Takeoff, Cost Estimation, BOQ Preparation, and Shop Drawings';
  const siteKeywords = keywords || 'civil engineering, steel detailing, rebar detailing, quantity takeoff, cost estimation, BOQ, shop drawings';

  // router.asPath excludes the locale prefix in Next i18n routing.
  const cleanPath = (router.asPath || '/').split('?')[0].split('#')[0] || '/';
  const canonical = localeUrl(locale, cleanPath);

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={OG_LOCALES[locale] || OG_LOCALES.en} />
      {LOCALE_CODES.filter((l) => l !== locale).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALES[l]} />
      ))}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical + hreflang alternates */}
      <link rel="canonical" href={canonical} />
      {LOCALE_CODES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={localeUrl(l, cleanPath)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={localeUrl('en', cleanPath)} />
    </Head>
  );
}
