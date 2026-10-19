import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/Admin/AdminLayout';
import ImageUpload from '../../../../components/Admin/ImageUpload';
import { servicesAPI } from '../../../../lib/api';

export default function EditService() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching service with ID:', id);
      
      // Try direct API call first
      try {
        const directService = await servicesAPI.getById(id);
        console.log('Service found via direct API:', directService);
        setService(directService);
        setLoading(false);
        return;
      } catch (directError) {
        console.warn('Direct API failed, trying admin list');
      }
      
      // Fallback: Get all services and find by ID
      const data = await servicesAPI.getAllAdmin();
      const servicesData = data.services || data || [];
      
      console.log('All services:', servicesData.length);
      
      const foundService = servicesData.find(s => 
        s._id === id || 
        s.id === id || 
        s._id?.toString() === id?.toString()
      );
      
      if (foundService) {
        console.log('Service found:', foundService.title);
        setService(foundService);
      } else {
        console.log('Service not found');
        setError('Service not found');
      }
    } catch (err) {
      console.error('Error fetching service:', err);
      setError('Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      console.log('Updating service:', service);
      
      const updateData = {
        title: service.title,
        slug: service.slug,
        icon: service.icon,
        shortDescription: service.shortDescription,
        description: service.description,
        features: service.features || [],
        price: service.price,
        timeline: service.timeline,
        image: service.image,
        imagePublicId: service.imagePublicId,
        order: service.order || 0,
        isActive: service.isActive !== undefined ? service.isActive : true,
      };
      
      await servicesAPI.update(id, updateData);
      alert('Service updated successfully!');
      router.push('/admin/services');
    } catch (err) {
      console.error('Error updating service:', err);
      setError(err.message || 'Failed to update service');
      setSaving(false);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...service.features];
    newFeatures[index] = value;
    setService({ ...service, features: newFeatures });
  };

  const addFeature = () => {
    setService({ ...service, features: [...(service.features || []), ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = service.features.filter((_, i) => i !== index);
    setService({ ...service, features: newFeatures });
  };

  const handleImageUpload = (url, publicId) => {
    setService({ ...service, image: url, imagePublicId: publicId });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading service...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error && !service) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🛠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/services')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (!service) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Service not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Edit Service</h2>
      
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
                value={service.title || ''}
                onChange={(e) => setService({ ...service, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                value={service.slug || ''}
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
                value={service.icon || ''}
                onChange={(e) => setService({ ...service, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                value={service.price || ''}
                onChange={(e) => setService({ ...service, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Starting from $99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
              <input
                type="text"
                value={service.timeline || ''}
                onChange={(e) => setService({ ...service, timeline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="3-5 business days"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <input
                type="number"
                value={service.order || 0}
                onChange={(e) => setService({ ...service, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Service Image</h3>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={service.image || ''}
            folder="civil-services/services"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <textarea
                value={service.shortDescription || ''}
                onChange={(e) => setService({ ...service, shortDescription: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Long Description *</label>
              <textarea
                value={service.description || ''}
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
          {(service.features || []).map((feature, index) => (
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
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Service'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}