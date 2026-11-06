import { servicesAPI, blogAPI, projectsAPI } from '../lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://precondetailing.com';
const LOCALES = ['en', 'ar', 'es'];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function localizedUrl(path, locale) {
  return locale === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
}

function alternates(path) {
  const links = LOCALES.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(localizedUrl(path, locale))}"/>`
  );
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedUrl(path, 'en'))}"/>`
  );
  return links.join('\n');
}

// One <url> block per locale, each carrying the full hreflang alternate set.
// lastmod is only emitted when a real modification date is known — static
// pages deliberately omit it instead of claiming "modified right now" on
// every request, which search engines learn to ignore.
function urlEntries(path, { lastmod = null, changefreq, priority }) {
  return LOCALES.map((locale) => {
    const lines = [
      '  <url>',
      `    <loc>${escapeXml(localizedUrl(path, locale))}</loc>`,
    ];
    if (lastmod) {
      lines.push(`    <lastmod>${new Date(lastmod).toISOString()}</lastmod>`);
    }
    lines.push(`    <changefreq>${changefreq}</changefreq>`);
    lines.push(`    <priority>${priority}</priority>`);
    lines.push(alternates(path));
    lines.push('  </url>');
    return lines.join('\n');
  }).join('\n');
}

function generateSiteMap(services, blogPosts, projects) {
  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/services', changefreq: 'daily', priority: '0.9' },
    { path: '/quote', changefreq: 'monthly', priority: '0.9' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/projects', changefreq: 'weekly', priority: '0.8' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.7' },
    { path: '/process', changefreq: 'monthly', priority: '0.7' },
    { path: '/tools', changefreq: 'monthly', priority: '0.7' },
    { path: '/tools/steel-weight', changefreq: 'monthly', priority: '0.6' },
    { path: '/tools/concrete', changefreq: 'monthly', priority: '0.6' },
    { path: '/tools/rebar', changefreq: 'monthly', priority: '0.6' },
    { path: '/reviews', changefreq: 'weekly', priority: '0.6' },
    { path: '/complaints', changefreq: 'yearly', priority: '0.4' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
    { path: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
  ];

  const sections = [
    staticPages
      .map((p) => urlEntries(p.path, { changefreq: p.changefreq, priority: p.priority }))
      .join('\n'),
    services
      .map((service) =>
        urlEntries(`/services/${service.slug}`, {
          lastmod: service.updatedAt || null,
          changefreq: 'weekly',
          priority: '0.8',
        })
      )
      .join('\n'),
    blogPosts
      .map((post) =>
        urlEntries(`/blog/${post.slug}`, {
          lastmod: post.updatedAt || post.createdAt || null,
          changefreq: 'weekly',
          priority: '0.7',
        })
      )
      .join('\n'),
    projects
      .map((project) =>
        urlEntries(`/projects/${project.slug}`, {
          lastmod: project.updatedAt || null,
          changefreq: 'monthly',
          priority: '0.6',
        })
      )
      .join('\n'),
  ].filter(Boolean);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    // Stylesheet so the sitemap renders as a readable table in browsers
    // (search engines still read the same underlying XML).
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    sections.join('\n'),
    '</urlset>',
    '',
  ].join('\n');
}

export async function getServerSideProps({ res }) {
  let sitemap;
  try {
    const services = await servicesAPI.getAll().catch(() => []);
    const blogData = await blogAPI.getAll().catch(() => ({ posts: [] }));
    const projects = await projectsAPI.getAll().catch(() => []);
    const blogPosts = blogData.posts || blogData || [];
    sitemap = generateSiteMap(services, blogPosts, projects);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    sitemap = generateSiteMap([], [], []);
  }

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
