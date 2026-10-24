import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import BlogCard from '../../components/BlogCard';
import { blogAPI } from '../../lib/api';
import { useT } from '../../lib/i18n';

const QUICK_STAT_ICONS = ['📝', '💡', '🎯'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const { t } = useT();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogAPI.getAll();
      const postsData = data.posts || data || [];
      setPosts(postsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(t('pages.blog.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(posts.map(post => post.category).filter(Boolean))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
    if (sortBy === 'oldest') return new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const totalPosts = posts.length;
  const displayedPosts = sortedPosts.length;
  const quickStats = t('pages.blog.quickStats');

  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/tlu9rzes/image/upload/v1792405692/civil-services/heroes/hero-blog.jpg"
          alt="Engineering Blog"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/70 to-black/80"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm mb-6 animate-fadeIn">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('common.home')}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-white font-medium">{t('pages.blog.crumb')}</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 animate-fadeIn">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-white font-medium">
                  {t('pages.blog.articlesPublished').replace('{count}', totalPosts)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slideIn">
                {t('pages.blog.titleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{t('pages.blog.titleB')}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-8 animate-fadeIn">
                {t('pages.blog.subtitle')}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                {quickStats.map((label, i) => (
                  <div key={label} className="flex items-center">
                    <span className="text-2xl mr-2">{QUICK_STAT_ICONS[i]}</span>
                    <span className="text-white font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 -mt-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <input
                  type="text"
                  placeholder={t('pages.blog.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <svg
                  className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">{t('pages.blog.sortNewest')}</option>
                <option value="oldest">{t('pages.blog.sortOldest')}</option>
                <option value="title">{t('pages.blog.sortTitle')}</option>
              </select>
            </div>

            {/* Category Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'All' ? t('pages.blog.all') : category}
                </button>
              ))}
            </div>

            {/* Results Counter */}
            {!loading && !error && (
              <div className="mt-4 text-sm text-gray-600">
                {t('pages.blog.showingA')} <span className="font-semibold">{displayedPosts}</span> {t('pages.blog.showingOf')} {totalPosts} {t('pages.blog.showingSuffix')}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={fetchPosts}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('pages.blog.tryAgain')}
              </button>
            </div>
          ) : sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post, index) => (
                <div
                  key={post._id || post.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 text-lg">{t('pages.blog.noArticles')}</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                {t('pages.blog.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1623489254637-a2dd8375243d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>

        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('pages.blog.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('pages.blog.ctaText')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {t('pages.blog.ctaBtn')}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
