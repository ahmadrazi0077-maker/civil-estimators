import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/Admin/AdminLayout';
import ImageUpload from '../../../components/Admin/ImageUpload';
import { servicesAPI } from '../../../lib/api';

export default function AddService() {
  const router = useRouter();
  const [service, setService] = useState({
    title: '',
    slug: '',
    icon: '',
    shortDescription: '',
    description: '',
    image: '',
    imagePublicId: '',
    price: '',
    timeline: '',
    features: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await servicesAPI.create(service);
      alert('Service added successfully!');
      router.push('/admin/services');
    } catch (err) {
      setError(err.message || 'Failed to add service');
      setLoading(false);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...service.features];
    newFeatures[index] = value;
    setService({ ...service, features: newFeatures });
  };

  const addFeature = () => {
    setService({ ...service, features: [...service.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = service.features.filter((_, i) => i !== index);
    setService({ ...service, features: newFeatures });
  };

  const handleImageUpload = (url, publicId) => {
  setService({ 
    ...service, 
    image: url, 
    imagePublicId: publicId || '' 
  });
};

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Add New Service</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields same as before */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => setService({ ...service, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                value={service.slug}
                onChange={(e) => {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                  setService({ ...service, slug });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
              <input
                type="text"
                value={service.icon}
                onChange={(e) => setService({ ...service, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                value={service.price}
                onChange={(e) => setService({ ...service, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
              <input
                type="text"
                value={service.timeline}
                onChange={(e) => setService({ ...service, timeline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Service Image</h3>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={service.image}
            folder="civil-services/services"
          />
        </div>
// Simple URL input in any form
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Image URL
  </label>
  <input
    type="url"
    value={service.image}
    onChange={(e) => setService({ ...service, image: e.target.value })}
    placeholder="https://example.com/image.jpg"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  {service.image && (
    <div className="mt-2 relative">
      <img
        src={service.image}
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
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <textarea
                value={service.shortDescription}
                onChange={(e) => setService({ ...service, shortDescription: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Long Description *</label>
              <textarea
                value={service.description}
                onChange={(e) => setService({ ...service, description: e.target.value })}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          {service.features.map((feature, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={`Feature ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add Feature
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/services')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}