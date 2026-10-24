import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Link from 'next/link';
import { reviewAPI } from '../lib/api';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';
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

export default function Reviews() {
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
  const [reviews, setReviews] = useState([]);
  const { t } = useT();

  const serviceLabels = t('pages.reviews.serviceNames');
  const ratingWords = t('pages.reviews.ratingWords');

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

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Hide success after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || t('pages.reviews.submitError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        image={HERO_IMAGES.reviews}
        title={t('pages.reviews.heroTitle')}
        subtitle={t('pages.reviews.heroSubtitle')}
        crumb={t('pages.reviews.crumb')}
      />

      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Review Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">{t('pages.reviews.formTitle')}</h2>

                {success && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 font-medium">
                      {t('pages.reviews.successMsg')}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Star Rating */}
                  <div className="text-center">
                    <label className="block text-sm font-medium mb-3">{t('pages.reviews.ratingLabel')}</label>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className={`text-5xl transition-all duration-200 ${
                            star <= formData.rating
                              ? 'text-yellow-400 scale-110'
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {ratingWords[formData.rating]}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('pages.reviews.nameLabel')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={t('pages.reviews.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('pages.reviews.emailLabel')}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={t('pages.reviews.emailPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('pages.reviews.serviceLabel')}</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('pages.reviews.selectService')}</option>
                        {SERVICE_VALUES.map((s, i) => (
                          <option key={s} value={s}>{serviceLabels[i]}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('pages.reviews.projectLabel')}</label>
                      <input
                        type="text"
                        required
                        value={formData.projectTitle}
                        onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={t('pages.reviews.projectPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('pages.reviews.companyLabel')}</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={t('pages.reviews.companyPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('pages.reviews.locationLabel')}</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={t('pages.reviews.locationPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('pages.reviews.reviewLabel')}</label>
                    <textarea
                      required
                      rows="6"
                      minLength="10"
                      maxLength="1000"
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder={t('pages.reviews.reviewPlaceholder')}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.review.length}/1000 {t('pages.reviews.charsSuffix')}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {loading ? t('pages.reviews.submitting') : t('pages.reviews.submit')}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Why Review */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4">{t('pages.reviews.whyTitle')}</h3>
                <ul className="space-y-3">
                  {t('pages.reviews.whyPoints').map((point) => (
                    <li key={point} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating Guide */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4">{t('pages.reviews.guideTitle')}</h3>
                <div className="space-y-2">
                  {t('pages.reviews.guide').map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">{t('pages.reviews.helpTitle')}</h3>
                <p className="text-blue-100 mb-4">{t('pages.reviews.helpText')}</p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {t('pages.reviews.contactBtn')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
