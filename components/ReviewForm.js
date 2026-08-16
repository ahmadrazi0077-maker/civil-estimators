import { useState } from 'react';
import { reviewAPI } from '../lib/api';

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    service: '',
    projectTitle: '',
    review: '',
    company: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await reviewAPI.create(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        rating: 5,
        service: '',
        projectTitle: '',
        review: '',
        company: '',
        location: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const services = [
    'Steel Detailing',
    'Rebar Detailing',
    'Quantity Takeoff',
    'Cost Estimation',
    'BOQ Preparation',
    'Shop Drawings',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-800">
            ✅ Thank you for your review! It will appear after approval.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Service Used *</label>
          <select
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">Select service</option>
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Project Title *</label>
          <input
            type="text"
            required
            value={formData.projectTitle}
            onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="e.g., Commercial Building Project"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Company (Optional)</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Location (Optional)</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className={`text-4xl transition-all ${
                star <= formData.rating ? 'text-yellow-400 scale-110' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Review *</label>
        <textarea
          required
          rows="5"
          minLength="10"
          maxLength="1000"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
          placeholder="Share your experience with our services..."
        />
        <p className="text-xs text-gray-500 mt-1">{formData.review.length}/1000 characters</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}