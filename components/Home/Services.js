import ServiceCard from '../ServiceCard';
import { useT } from '../../lib/i18n';

export default function Services({ services = [], loading = false, error = null, onRetry }) {
  const { t } = useT();

  const sectionHeader = (
    <div className="text-center mb-16">
      <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
        {t('home.servicesSection.badge')}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {t('home.servicesSection.titleWhatWe')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('home.servicesSection.titleOffer')}</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {t('home.servicesSection.subtitle')}
      </p>
    </div>
  );

  // Loading State - Skeleton Cards
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          {sectionHeader}

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                {/* Image Skeleton */}
                <div className="h-52 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

                {/* Content Skeleton */}
                <div className="p-6">
                  {/* Title */}
                  <div className="h-6 bg-gray-200 rounded-lg mb-3 w-3/4"></div>

                  {/* Description */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4">{t('home.servicesSection.errorTitle')}</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('home.servicesSection.tryAgain')}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Success State - Show Services
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full -ml-36 -mb-36 opacity-50"></div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        {sectionHeader}

        {/* Services Grid */}
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service._id || service.id || `service-${index}`}
                service={service}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">{t('home.servicesSection.noServices')}</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {t('home.servicesSection.viewAll')}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
