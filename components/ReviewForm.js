import { useState } from 'react';
import { reviewAPI } from '../lib/api';
import { useT } from '../lib/i18n';

// Option values stay English (submitted to the backend); labels are localized.
const SERVICE_VALUES = [
  'Steel Detailing',
  'Rebar Detailing',
  'Quantity Takeoff',
  'Cost Estimation',
  'BOQ Preparation',
  'Shop Drawings',
];

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
  const { t } = useT();
  const serviceLabels = t('pages.reviews.serviceNames');

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
      setError(err.message || t('pages.reviewForm.submitError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-800">
            {t('pages.reviewForm.successMsg')}
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
          <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.nameLabel')}</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.emailLabel')}</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.serviceLabel')}</label>
          <select
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">{t('pages.reviewForm.selectService')}</option>
            {SERVICE_VALUES.map((s, i) => (
              <option key={s} value={s}>{serviceLabels[i]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.projectLabel')}</label>
          <input
            type="text"
            required
            value={formData.projectTitle}
            onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder={t('pages.reviewForm.projectPlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.companyLabel')}</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.locationLabel')}</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder={t('pages.reviewForm.locationPlaceholder')}
          />
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.ratingLabel')}</label>
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
        <label className="block text-sm font-medium mb-2">{t('pages.reviewForm.reviewLabel')}</label>
        <textarea
          required
          rows="5"
          minLength="10"
          maxLength="1000"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          className="w-full px-4 py-3 border rounded-lg"
          placeholder={t('pages.reviewForm.reviewPlaceholder')}
        />
        <p className="text-xs text-gray-500 mt-1">{formData.review.length}/1000 {t('pages.reviewForm.charsSuffix')}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? t('pages.reviewForm.submitting') : t('pages.reviewForm.submit')}
      </button>
    </form>
  );
}
