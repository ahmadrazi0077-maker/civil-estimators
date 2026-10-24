import { useState, useEffect } from 'react';
import { reviewAPI } from '../lib/api';
import { useT } from '../lib/i18n';

export default function ReviewsDisplay() {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ total: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);
  const { t } = useT();

  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await reviewAPI.getAll({ limit: 6 });
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await reviewAPI.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">{t('pages.reviewsDisplay.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-6 text-center">
        <p className="text-5xl font-bold mb-2">{stats.averageRating.toFixed(1)}</p>
        <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
        <p className="text-blue-100">{t('pages.reviewsDisplay.basedOn').replace('{total}', stats.total)}</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.company}</p>
                </div>
              </div>
              <div className="text-yellow-400">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.review}</p>

            <div className="text-sm text-gray-500">
              <p><strong>{t('pages.reviewsDisplay.service')}</strong> {review.service}</p>
              <p><strong>{t('pages.reviewsDisplay.project')}</strong> {review.projectTitle}</p>
              {review.location && <p><strong>{t('pages.reviewsDisplay.location')}</strong> {review.location}</p>}
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                👍 {t('pages.reviewsDisplay.helpful')} ({review.helpfulCount})
              </button>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
