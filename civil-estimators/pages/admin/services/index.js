import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout';
import Link from 'next/link';
import { servicesAPI } from '../../../lib/api';

export default function AdminServices() {
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await servicesAPI.getAll();
      setServiceList(data);
      setError('');
    } catch (err) {
      setError('Failed to load services');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesAPI.delete(id);
        fetchServices();
      } catch (err) {
        alert('Failed to delete service');
        console.error('Error:', err);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Services Management</h2>
        <Link
          href="/admin/services/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Service
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {serviceList.map((service) => (
              <tr key={service._id}>
                <td className="px-6 py-4">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{service.title}</td>
                <td className="px-6 py-4">{service.slug}</td>
                <td className="px-6 py-4">{service.price || 'N/A'}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/services/edit/${service._id}`}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}