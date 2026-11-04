import { useState, useEffect } from 'react';
import { useT } from '../../lib/i18n';
import { reviewAPI } from '../../lib/api';

// Homepage testimonials show ONLY real, admin-approved client reviews
// served by the backend (GET /api/reviews returns approved reviews only).
// While there are no approved reviews, the section stays hidden —
// no sample or placeholder reviews are ever displayed.
export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { t } = useT();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await reviewAPI.getAll({ limit: 9 });
      if (!cancelled && data && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (reviews.length === 0) {
    return null;
  }

  const active = reviews[Math.min(activeTestimonial, reviews.length - 1)];
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    active.name
  )}&background=2563eb&color=fff`;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full opacity-50"></div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t('home.testimonials.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('home.testimonials.titleWhatOur')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              {t('home.testimonials.titleClientsSay')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              "
            </div>

            {/* Content */}
            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">
                "{active.review}"
              </p>

              <div className="flex items-center justify-center mb-6">
                <img
                  src={avatar}
                  alt={active.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <p className="font-bold text-lg">{active.name}</p>
                  {active.company && (
                    <p className="text-blue-600 text-sm">{active.company}</p>
                  )}
                  {active.location && (
                    <p className="text-gray-600 text-sm">{active.location}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < (active.rating || 5)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {active.projectTitle && (
                <p className="text-sm text-gray-500">
                  {t('home.testimonials.projectLabel')} {active.projectTitle}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Dots */}
          {reviews.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === Math.min(activeTestimonial, reviews.length - 1)
                      ? 'w-8 bg-blue-600'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
