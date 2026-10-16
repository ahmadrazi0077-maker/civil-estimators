import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { servicesAPI, blogAPI, projectsAPI } from '../lib/api';

export default function Sitemap() {
  const [services, setServices] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSitemapData();
  }, []);

  const fetchSitemapData = async () => {
    try {
      const [servicesData, blogData, projectsData] = await Promise.all([
        servicesAPI.getAll().catch(() => []),
        blogAPI.getAll().catch(() => ({ posts: [] })),
        projectsAPI.getAll().catch(() => []),
      ]);

      setServices(servicesData || []);
      setBlogPosts(blogData.posts || blogData || []);
      setProjects(projectsData || []);
    } catch (error) {
      console.error('Error fetching sitemap data:', error);
    } finally {
      setLoading(false);
    }
  };

 const mainPages = [
  { name: 'Home', href: '/', description: 'Welcome to CivilPro Services' },
  { name: 'About Us', href: '/about', description: 'Learn about our company' },
  { name: 'Services', href: '/services', description: 'Explore our services' },
  { name: 'Blog', href: '/blog', description: 'Read our latest articles' },
  { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
  { name: 'Privacy Policy', href: '/privacy-policy', description: 'Read our privacy policy' },
  { name: 'Terms of Service', href: '/terms-of-service', description: 'Read our terms of service' },
  { name: 'Sitemap', href: '/sitemap', description: 'Browse all pages' },
];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading sitemap...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
          <p className="text-xl text-blue-100">Browse all pages on our website</p>
        </div>
      </div>

      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Main Pages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">📄</span>
                Main Pages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mainPages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <p className="font-semibold group-hover:text-blue-600 transition-colors">
                        {page.name}
                      </p>
                      <p className="text-sm text-gray-600">{page.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🛠️</span>
                  Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Link
                      key={service._id || service.id}
                      href={`/services/${service.slug}`}
                      className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <span className="text-2xl mr-3">{service.icon}</span>
                      <div>
                        <p className="font-semibold group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {service.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Posts */}
            {blogPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-2xl mr-2">📝</span>
                  Blog Articles
                </h2>
                <div className="space-y-3">
                  {blogPosts.map((post) => (
                    <Link
                      key={post._id || post.id}
                      href={`/blog/${post.slug}`}
                      className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <p className="font-semibold group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {post.category} • {post.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🏗️</span>
                  Our Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project._id || project.id}
                      className="p-3 rounded-lg"
                    >
                      <p className="font-semibold">{project.title}</p>
                      <p className="text-sm text-gray-600">
                        {project.category} • {project.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🔗</span>
                Quick Links
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
                <Link href="/services" className="text-blue-600 hover:text-blue-800">
                  Services
                </Link>
                <Link href="/projects" className="text-blue-600 hover:text-blue-800">
                  Projects
                </Link>
                <Link href="/quote" className="text-blue-600 hover:text-blue-800">
                  Get a Quote
                </Link>
                <Link href="/tools" className="text-blue-600 hover:text-blue-800">
                  Free Tools
                </Link>
                <Link href="/about" className="text-blue-600 hover:text-blue-800">
                  About Us
                </Link>
                <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                  Blog
                </Link>
                <Link href="/reviews" className="text-blue-600 hover:text-blue-800">
                  Reviews
                </Link>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                  Contact Us
                </Link>
                <Link href="/complaints" className="text-blue-600 hover:text-blue-800">
                  Complaints
                </Link>
                <Link href="/sitemap.xml" className="text-blue-600 hover:text-blue-800">
                  XML Sitemap
                </Link>
                <Link href="/robots.txt" className="text-blue-600 hover:text-blue-800">
                  Robots.txt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}