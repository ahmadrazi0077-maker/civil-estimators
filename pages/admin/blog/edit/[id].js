import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/Admin/AdminLayout';
import ImageUpload from '../../../../components/Admin/ImageUpload';
import { blogAPI } from '../../../../lib/api';

export default function EditBlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get all posts and find by ID
      const data = await blogAPI.getAllAdmin();
      const postsData = data.posts || data || [];
      
      console.log('Looking for post with ID:', id);
      console.log('Available posts:', postsData.length);
      
      const foundPost = postsData.find(p => 
        p._id === id || 
        p.id === id || 
        p._id?.toString() === id?.toString()
      );
      
      if (foundPost) {
        console.log('Post found:', foundPost.title);
        setPost(foundPost);
      } else {
        console.log('Post not found');
        setError('Blog post not found');
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      console.log('Updating post:', post);
      await blogAPI.update(id, post);
      alert('Blog post updated successfully!');
      router.push('/admin/blog');
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err.message || 'Failed to update blog post');
      setSaving(false);
    }
  };

  const handleImageUpload = (url, publicId) => {
    setPost({ ...post, image: url, imagePublicId: publicId });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setPost({ ...post, tags });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error && !post) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/blog')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Blog
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Post not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Edit Blog Post</h2>
      
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
                value={post.title || ''}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                value={post.slug || ''}
                onChange={(e) => {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                  setPost({ ...post, slug });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={post.category || ''}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                value={post.author || ''}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
              <input
                type="text"
                value={post.readTime || ''}
                onChange={(e) => setPost({ ...post, readTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={post.tags ? post.tags.join(', ') : ''}
                onChange={handleTagsChange}
                placeholder="steel, detailing, tips"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Blog Image</h3>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={post.image || ''}
            folder="civil-services/blog"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
              <textarea
                value={post.excerpt || ''}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                value={post.content || ''}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                rows="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Post'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}