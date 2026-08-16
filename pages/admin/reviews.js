import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { reviewAPI } from '../../lib/api';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await reviewAPI.getAllAdmin();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await reviewAPI.approve(id);
    fetchReviews();
  };

  const handleFeature = async (id) => {
    await reviewAPI.feature(id);
    fetchReviews();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this review?')) {
      await reviewAPI.delete(id);
      fetchReviews();
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'approved') return r.isApproved;
    if (filter === 'pending') return !r.isApproved;
    if (filter === 'featured') return r.isFeatured;
    return true;
  });

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Reviews Management</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white'}`}>All</button>
        <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Pending</button>
        <button onClick={() => setFilter('approved')} className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Approved</button>
        <button onClick={() => setFilter('featured')} className={`px-4 py-2 rounded-lg ${filter === 'featured' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Featured</button>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Rating</th>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredReviews.map(review => (
              <tr key={review._id}>
                <td className="px-6 py-4">
                  <p className="font-medium">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.email}</p>
                </td>
                <td className="px-6 py-4 text-yellow-400">
                  {'★'.repeat(review.rating)}
                </td>
                <td className="px-6 py-4">{review.service}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  {review.isFeatured && (
                    <span className="ml-2 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Featured</span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  {!review.isApproved && (
                    <button onClick={() => handleApprove(review._id)} className="text-green-600">Approve</button>
                  )}
                  <button onClick={() => handleFeature(review._id)} className="text-blue-600">
                    {review.isFeatured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button onClick={() => handleDelete(review._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}