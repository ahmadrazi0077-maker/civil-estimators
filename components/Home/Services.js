import ServiceCard from '../ServiceCard';

export default function Services({ services = [], loading = false, error = null, onRetry }) {
  console.log('🔍 Services component rendering with:', services?.length, 'services');

  // Loading
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          {onRetry && (
            <button onClick={onRetry} className="bg-blue-600 text-white px-6 py-2 rounded-xl">
              Retry
            </button>
          )}
        </div>
      </section>
    );
  }

  // Always render grid (even if empty, show message)
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Offer</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive engineering solutions tailored to meet your project requirements
          </p>
        </div>

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
            <p className="text-gray-500">No services available.</p>
          </div>
        )}
      </div>
    </section>
  );
}