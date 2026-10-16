import Link from 'next/link';

export default function ServiceCard({ service }) {
  if (!service) return null;

  // Placeholder images mapping
  const placeholderImages = {
    'steel-detailing': '/images/services/steel-detailing.svg',
    'rebar-detailing': '/images/services/rebar-detailing.svg',
    'quantity-takeoff': '/images/services/quantity-takeoff.svg',
    'cost-estimation': '/images/services/cost-estimation.svg',
    'boq-preparation': '/images/services/boq-preparation.svg',
    'shop-drawings': '/images/services/shop-drawings.svg',
  };

  const imageUrl = service.image || placeholderImages[service.slug] || '/images/services/placeholder.svg';

  return (
    <Link href={`/services/${service.slug}`} className="block group h-full">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-2">
        
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
          <img
            src={imageUrl}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl text-white">${service.icon || '🛠️'}</div>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Icon Badge */}
          <div className="absolute bottom-4 left-4 flex items-center">
            <span className="text-3xl">{service.icon || '🛠️'}</span>
          </div>
          
          {/* Price Badge */}
          {service.price && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
              {service.price}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
            {service.shortDescription || service.description}
          </p>

          {/* Features Preview */}
          {service.features && service.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    ✓ {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t">
            <span className="text-blue-600 inline-flex items-center font-semibold group-hover:translate-x-1 transition-transform">
              Learn More
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            
            {service.timeline && (
              <span className="text-xs text-gray-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.timeline}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}