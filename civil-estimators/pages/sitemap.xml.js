import { servicesAPI, blogAPI, projectsAPI } from '../lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

function generateSiteMap(services, blogPosts, projects) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
    <url>
      <loc>${BASE_URL}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${BASE_URL}/about</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${BASE_URL}/services</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${BASE_URL}/blog</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${BASE_URL}/contact</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>${BASE_URL}/quote</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${BASE_URL}/projects</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${BASE_URL}/tools</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>${BASE_URL}/tools/steel-weight</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
    <url>
      <loc>${BASE_URL}/tools/concrete</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
    <url>
      <loc>${BASE_URL}/tools/rebar</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
    <url>
      <loc>${BASE_URL}/complaints</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.4</priority>
    </url>
    <url>
      <loc>${BASE_URL}/reviews</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>

    <!-- Services Pages -->
    ${services.map(service => `
    <url>
      <loc>${BASE_URL}/services/${service.slug}</loc>
      <lastmod>${service.updatedAt || new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `).join('')}

    <!-- Blog Posts -->
    ${blogPosts.map(post => `
    <url>
      <loc>${BASE_URL}/blog/${post.slug}</loc>
      <lastmod>${post.updatedAt || post.createdAt || new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    `).join('')}

    <!-- Projects (if public) -->
    ${projects.map(project => `
    <url>
      <loc>${BASE_URL}/projects/${project.slug}</loc>
      <lastmod>${project.updatedAt || new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
    `).join('')}
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