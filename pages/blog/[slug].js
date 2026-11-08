import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { blogAPI } from '../../lib/api';
import { useT } from '../../lib/i18n';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const { t, locale } = useT();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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
      const others = postsData.filter(p => p.slug !== slug);
      // Same-category articles first, then the rest
      others.sort((a, b) => {
        const ac = post && a.category === post.category ? 0 : 1;
        const bc = post && b.category === post.category ? 0 : 1;
        return ac - bc;
      });
      setRelatedPosts(others.slice(0, 3));
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

  const formatDate = (p) => {
    const raw = p?.createdAt || p?.date;
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return typeof raw === 'string' ? raw : '';
    try {
      return d.toLocaleDateString(locale === 'ar' ? 'ar' : locale === 'es' ? 'es' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch {
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  const readMinutes = (p) => {
    if (p?.readTime) return p.readTime;
    const words = (p?.content || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} ${t('pages.blogPost.minRead')}`;
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
          <div className="text-center px-4">
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
  const pageUrl = `https://precondetailing.com/blog/${post.slug || slug}`;
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(pageUrl);
  const dateStr = formatDate(post);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const shareBtn =
    'w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110';

  return (
    <Layout>
      {/* Article Header */}
      <div className="bg-gradient-to-b from-blue-50 via-white to-white pt-10 md:pt-14 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1 text-sm mb-6">
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
                {t('common.home')}
              </Link>
              <span className="text-gray-300">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-blue-600 transition-colors">
                {t('pages.blog.crumb')}
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-800 font-medium line-clamp-1 max-w-[16rem] sm:max-w-xs">{post.title}</span>
            </nav>

            {/* Category Badge */}
            {post.category && (
              <div className="mb-5">
                <span className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-[2.6rem] md:leading-[1.2] font-extrabold text-gray-900 mb-7">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-3">
              <div className="flex items-center">
                <img
                  src="/logo-mark.png"
                  alt={post.author || 'Precon Detailing'}
                  className="w-10 h-10 rounded-full object-contain bg-white border border-gray-200 p-0.5"
                />
                <span className="ml-2.5 font-semibold text-gray-800 text-sm">{post.author}</span>
              </div>
              {dateStr && (
                <>
                  <span className="text-gray-300 hidden sm:inline">•</span>
                  <span className="text-sm text-gray-500">{dateStr}</span>
                </>
              )}
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readMinutes(post)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-60 sm:h-80 md:h-[26rem] object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt — article intro (articles are English on every locale) */}
            {post.excerpt && (
              <div dir="ltr" className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl mb-10">
                <p className="text-lg text-gray-700 italic leading-relaxed text-left">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div
              dir="ltr"
              className="article-body text-left mb-12"
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
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section — real share links */}
            <div className="border-t border-b border-gray-200 py-6 mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{t('pages.blogPost.share')}</h3>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
                    className={`${shareBtn} bg-[#1877F2] hover:bg-[#1664d2]`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank" rel="noopener noreferrer" aria-label="Share on X"
                    className={`${shareBtn} bg-black hover:bg-gray-800`}
                  >
                    <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
                    className={`${shareBtn} bg-[#0A66C2] hover:bg-[#0958a6]`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                    target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"
                    className={`${shareBtn} bg-[#25D366] hover:bg-[#1eb856]`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <button
                    onClick={copyLink}
                    aria-label="Copy link"
                    className={`${shareBtn} ${copied ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {copied && (
                <p className="text-sm text-green-600 font-medium text-center sm:text-right mt-3">
                  {t('pages.blogPost.copied')}
                </p>
              )}
            </div>

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-7 mb-12">
              <div className="flex flex-col sm:flex-row sm:items-start items-center text-center sm:text-left gap-4">
                <img
                  src="/logo-mark.png"
                  alt={post.author || 'Precon Detailing'}
                  className="w-16 h-16 rounded-2xl object-contain bg-white border border-gray-200 p-1.5 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold mb-0.5">{post.author}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">{t('pages.blogPost.authorRole')}</p>
                  <p className="text-gray-600 leading-relaxed">{t('pages.blogPost.bio')}</p>
                </div>
              </div>
            </div>

            {/* Back to blog */}
            <div className="flex justify-between items-center mb-4">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              {t('pages.blogPost.relatedA')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {t('pages.blogPost.relatedB')}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => {
                const relatedImage = relatedPost.image || getPlaceholderImage(relatedPost.category);
                const relatedDate = formatDate(relatedPost);
                return (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost._id || relatedPost.id} className="block group">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 h-full">
                      <div className="relative h-44 overflow-hidden">
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
                      <div className="p-5">
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          {relatedDate && <span>{relatedDate}</span>}
                          {relatedDate && <span className="mx-2">•</span>}
                          <span>{readMinutes(relatedPost)}</span>
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
            href="/quote"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {t('pages.blogPost.ctaBtn')}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
