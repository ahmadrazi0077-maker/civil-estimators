export async function getServerSideProps({ res }) {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  const robotsTxt = `# *
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin
Disallow: /admin/*
Disallow: /api
Disallow: /api/*

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay
Crawl-delay: 10
`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return { props: {} };
}

export default function Robots() {
  return null;
}