import Head from 'next/head';

export default function SEO({ 
  title, 
  description, 
  keywords,
  ogImage,
  ogType = 'website'
}) {
  const siteTitle = title ? `${title} | CivilPro Services` : 'CivilPro Services';
  const siteDescription = description || 'Professional Civil Engineering Services - Steel Detailing, Rebar Detailing, Quantity Takeoff, Cost Estimation, BOQ Preparation, and Shop Drawings';
  const siteKeywords = keywords || 'civil engineering, steel detailing, rebar detailing, quantity takeoff, cost estimation, BOQ, shop drawings';

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
    </Head>
  );
}