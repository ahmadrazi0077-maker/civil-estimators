import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/Admin/AdminLayout';
import ImageUpload from '../../../components/Admin/ImageUpload';
import { blogAPI } from '../../../lib/api';

export default function AddBlogPost() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    author: '',
    readTime: '5 min read',
    image: '',
    imagePublicId: '',
    content: '',
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Steel Detailing',
    'Rebar Detailing',
    'Quantity Takeoff',
    'Cost Estimation',
    'BOQ Preparation',
    'Shop Drawings',
    'Industry News',
    'Tips & Tricks',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await blogAPI.create(post);
      alert('Blog post added successfully!');
      router.push('/admin/blog');
    } catch (err) {
      setError(err.message || 'Failed to add blog post');
      setLoading(false);
    }
  };

  const handleImageUpload = (url, publicId) => {
  setPost({ 
    ...post, 
    image: url, 
    imagePublicId: publicId || '' 
  });
};

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setPost({ ...post, tags });
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Add New Blog Post</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                  setPost({ ...post, slug });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={post.category}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
              <input
                type="text"
                value={post.author}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
              <input
                type="text"
                value={post.readTime}
                onChange={(e) => setPost({ ...post, readTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="steel, detailing, tips"
                onChange={handleTagsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Blog Image</h3>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={post.image}
            folder="civil-services/blog"
          />
        </div>
// Simple URL input in any form
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Image URL
  </label>
  <input
    type="url"
    value={post.image}
    onChange={(e) => setPost({ ...post, image: e.target.value })}
    placeholder="https://example.com/image.jpg"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  {post.image && (
    <div className="mt-2 relative">
      <img
        src={post.image}
        alt="Preview"
        className="w-full h-48 object-cover rounded-lg"
        onError={(e) => {
          e.target.style.display = 'none';
          alert('Invalid image URL');
        }}
      />
      <button
        type="button"
        onClick={() => setPost({ ...post, image: '' })}
        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
      >
        ✕
      </button>
    </div>
  )}
</div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                rows="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Write your blog post content here..."
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Post'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}