import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { blogAPI } from '../../lib/api';
import { useT } from '../../lib/i18n';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useT();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
      fetchRelatedPosts();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await blogAPI.getBySlug(slug);
      setPost(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const allPosts = await blogAPI.getAll();
      const postsData = allPosts.posts || allPosts || [];
      const filtered = postsData
        .filter(p => p.slug !== slug)
        .slice(0, 3);
      setRelatedPosts(filtered);
    } catch (err) {
      console.error('Error fetching related posts:', err);
    }
  };

  const getPlaceholderImage = (category) => {
    const categoryLower = (category || '').toLowerCase();
    if (categoryLower.includes('steel')) return '/images/blog/blog-1.svg';
    if (categoryLower.includes('cost')) return '/images/blog/blog-2.svg';
    if (categoryLower.includes('boq')) return '/images/blog/blog-3.svg';
    return '/images/blog/blog-1.svg';
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">{t('pages.blogPost.loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-4xl font-bold mb-4">{t('pages.blogPost.notFoundTitle')}</h1>
            <p className="text-gray-600 mb-6">{t('pages.blogPost.notFoundText')}</p>
            <Link href="/blog" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              {t('pages.blogPost.backToBlog')}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const imageUrl = post.image || getPlaceholderImage(post.category);

  return (
    <Layout>
      {/* Hero Section with Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm mb-4 animate-fadeIn">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('common.home')}
                </Link>
                <span className="text-gray-400">/</span>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  {t('pages.blog.crumb')}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-white font-medium line-clamp-1">{post.title}</span>
              </nav>

              {/* Category Badge */}
              <div className="mb-4 animate-fadeIn">
                <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-slideIn">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                  {post.author ? post.author.charAt(0) : 'A'}
                </div>
                <div>
                  <p className="text-white font-semibold">{post.author}</p>
                  <div className="flex items-center text-sm text-gray-300">
                    <span>{post.date}</span>
                    {post.readTime && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </>
                    )}
                    {post.views > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.views} {t('pages.blogPost.views')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Excerpt */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
              <p className="text-lg text-gray-700 italic">
                {post.excerpt}
              </p>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4">{t('pages.blogPost.tags')}</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="border-t border-b py-6 mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{t('pages.blogPost.share')}</h3>
                <div className="flex space-x-3">
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-sky-500 text-white rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-12">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {post.author ? post.author.charAt(0) : 'A'}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{post.author}</h3>
                  <p className="text-gray-600 text-sm mb-2">{t('pages.blogPost.authorRole')}</p>
                  <p className="text-gray-700">
                    {t('pages.blogPost.bioPrefix')} {post.category.toLowerCase()}. {t('pages.blogPost.bioSuffix')}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mb-12">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('pages.blogPost.backToBlog')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('pages.blogPost.relatedA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('pages.blogPost.relatedB')}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => {
                const relatedImage = relatedPost.image || getPlaceholderImage(relatedPost.category);
                return (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost._id || relatedPost.id} className="block group">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{relatedPost.date}</span>
                          {relatedPost.readTime && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{relatedPost.readTime}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('pages.blogPost.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('pages.blogPost.ctaText')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {t('pages.blogPost.ctaBtn')}
          </Link>
        </div>
      </div>
    </Layout>
  );
}