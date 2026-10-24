import Link from 'next/link';
import { useT } from '../lib/i18n';

export default function BlogCard({ post }) {
  const { t } = useT();
  const placeholderImages = {
    'steel-detailing': '/images/blog/blog-1.svg',
    'cost-estimation': '/images/blog/blog-2.svg',
    'boq': '/images/blog/blog-3.svg',
  };

  const getPlaceholderImage = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('steel')) return '/images/blog/blog-1.svg';
    if (categoryLower.includes('cost')) return '/images/blog/blog-2.svg';
    if (categoryLower.includes('boq')) return '/images/blog/blog-3.svg';
    return '/images/blog/blog-1.svg';
  };

  const imageUrl = post.image || getPlaceholderImage(post.category);

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
            {post.category}
          </div>
          
          {/* Read Time */}
          {post.readTime && (
            <div className="absolute bottom-4 right-4 flex items-center text-white text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Meta Info */}
          <div className="flex items-center mb-3 text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                {post.author ? post.author.charAt(0) : 'A'}
              </div>
              <span>{post.author}</span>
            </div>
            <span className="mx-1">•</span>
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
            {post.excerpt}
          </p>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t">
            <span className="text-blue-600 inline-flex items-center font-semibold group-hover:translate-x-1 transition-transform">
              {t('pages.blog.readMore')}
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            
            <span className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}