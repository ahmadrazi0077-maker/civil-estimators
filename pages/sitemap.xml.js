import { servicesAPI, blogAPI, projectsAPI } from '../lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://civil-estimators.vercel.app';
const LOCALES = ['en', 'ar', 'es'];

function localizedUrl(path, locale) {
  return locale === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
}

function alternates(path) {
  const links = LOCALES.map(
    (locale) => `      <xhtml:link rel="alternate" hreflang="${locale}" href="${localizedUrl(path, locale)}"/>`
  );
  links.push(`      <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(path, 'en')}"/>`);
  return links.join('\n');
}

function urlEntries(path, lastmod, changefreq, priority) {
  return LOCALES.map((locale) => `    <url>
      <loc>${localizedUrl(path, locale)}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
${alternates(path)}
    </url>`).join('\n');
}

function generateSiteMap(services, blogPosts, projects) {
  const now = new Date().toISOString();

  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/services', changefreq: 'daily', priority: '0.9' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.7' },
    { path: '/quote', changefreq: 'monthly', priority: '0.9' },
    { path: '/projects', changefreq: 'weekly', priority: '0.8' },
    { path: '/tools', changefreq: 'monthly', priority: '0.7' },
    { path: '/tools/steel-weight', changefreq: 'monthly', priority: '0.6' },
    { path: '/tools/concrete', changefreq: 'monthly', priority: '0.6' },
    { path: '/tools/rebar', changefreq: 'monthly', priority: '0.6' },
    { path: '/complaints', changefreq: 'yearly', priority: '0.4' },
    { path: '/reviews', changefreq: 'weekly', priority: '0.6' },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <!-- Static Pages (all locales, with hreflang alternates) -->
${staticPages.map((p) => urlEntries(p.path, now, p.changefreq, p.priority)).join('\n')}

    <!-- Services Pages -->
${services.map((service) => urlEntries(`/services/${service.slug}`, service.updatedAt || now, 'weekly', '0.8')).join('\n')}

    <!-- Blog Posts -->
${blogPosts.map((post) => urlEntries(`/blog/${post.slug}`, post.updatedAt || post.createdAt || now, 'weekly', '0.7')).join('\n')}

    <!-- Projects (if public) -->
${projects.map((project) => urlEntries(`/projects/${project.slug}`, project.updatedAt || now, 'monthly', '0.6')).join('\n')}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  try {
    // Fetch data
    const services = await servicesAPI.getAll().catch(() => []);
    const blogData = await blogAPI.getAll().catch(() => ({ posts: [] }));
    const projects = await projectsAPI.getAll().catch(() => []);

    const blogPosts = blogData.posts || blogData || [];

    const sitemap = generateSiteMap(services, blogPosts, projects);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return basic sitemap with just static pages
    const sitemap = generateSiteMap([], [], []);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
  }
}

export default function Sitemap() {
  return null;
}
