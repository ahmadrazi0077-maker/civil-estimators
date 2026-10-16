import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/Admin/AdminLayout';
import ImageUpload from '../../../components/Admin/ImageUpload';
import { projectsAPI } from '../../../lib/api';

export default function AddProject() {
  const router = useRouter();
  const [project, setProject] = useState({
    title: '',
    slug: '',
    category: '',
    location: '',
    size: '',
    duration: '',
    value: '',
    description: '',
    clientName: '',
    year: new Date().getFullYear(),
    image: '',
    imagePublicId: '',
    isFeatured: false,
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
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await projectsAPI.create(project);
      alert('Project added successfully!');
      router.push('/admin/projects');
    } catch (err) {
      setError(err.message || 'Failed to add project');
      setLoading(false);
    }
  };

  const handleImageUpload = (url, publicId) => {
    setProject({ ...project, image: url, imagePublicId: publicId });
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Add New Project</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Project Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                value={project.slug}
                onChange={(e) => {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                  setProject({ ...project, slug });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={project.category}
                onChange={(e) => setProject({ ...project, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={project.location}
                onChange={(e) => setProject({ ...project, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="New York, USA"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Size *</label>
              <input
                type="text"
                value={project.size}
                onChange={(e) => setProject({ ...project, size: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="50,000 sq ft"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
              <input
                type="text"
                value={project.duration}
                onChange={(e) => setProject({ ...project, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="2 months"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Value *</label>
              <input
                type="text"
                value={project.value}
                onChange={(e) => setProject({ ...project, value: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="$2M"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <input
                type="text"
                value={project.clientName}
                onChange={(e) => setProject({ ...project, clientName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="number"
                value={project.year}
                onChange={(e) => setProject({ ...project, year: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Project Image */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Project Image</h3>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={project.image}
            folder="civil-services/projects"
          />
        </div>
// Simple URL input in any form
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Image URL
  </label>
  <input
    type="url"
    value={project.image}
    onChange={(e) => setProject({ ...project, image: e.target.value })}
    placeholder="https://example.com/image.jpg"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  {project.image && (
    <div className="mt-2 relative">
      <img
        src={project.image}
        alt="Preview"
        className="w-full h-48 object-cover rounded-lg"
        onError={(e) => {
          e.target.style.display = 'none';
          alert('Invalid image URL');
        }}
      />
      <button
        type="button"
        onClick={() => setService({ ...service, image: '' })}
        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
      >
        ✕
      </button>
    </div>
  )}
</div>
        {/* Description */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Project Description</h3>
          <textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Describe the project..."
            required
          />
        </div>

        {/* Featured Toggle */}
        <div className="bg-white rounded-lg shadow p-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={project.isFeatured}
              onChange={(e) => setProject({ ...project, isFeatured: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="ml-3">
              <span className="font-semibold">Featured Project</span>
              <span className="text-sm text-gray-600 block">Show this project on the homepage</span>
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}