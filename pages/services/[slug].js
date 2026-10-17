import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { servicesAPI } from '../../lib/api';
import SEO from '../../components/SEO';

export default function ServiceDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [service, setService] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchService();
      fetchOtherServices();
    }
  }, [slug]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const data = await servicesAPI.getBySlug(slug);
      setService(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching service:', err);
      setError('Service not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherServices = async () => {
    try {
      const allServices = await servicesAPI.getAll();
      const filtered = allServices.filter(s => s.slug !== slug).slice(0, 3);
      setOtherServices(filtered);
    } catch (err) {
      console.error('Error fetching other services:', err);
    }
  };

  // Placeholder images
  const placeholderImages = {
    'steel-detailing': '/images/services/steel-detailing.svg',
    'rebar-detailing': '/images/services/rebar-detailing.svg',
    'quantity-takeoff': '/images/services/quantity-takeoff.svg',
    'cost-estimation': '/images/services/cost-estimation.svg',
    'boq-preparation': '/images/services/boq-preparation.svg',
    'shop-drawings': '/images/services/shop-drawings.svg',
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading service...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
            <Link href="/services" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Back to Services
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const imageUrl = service.image || placeholderImages[service.slug] || '/images/services/placeholder.svg';

  return (
    <Layout>
      <SEO
        title={service.title}
        description={service.shortDescription || `Professional ${service.title.toLowerCase()} for contractors worldwide — accurate, fast and affordable.`}
        keywords={`${service.title.toLowerCase()}, construction estimating services, quantity takeoff, cost estimation, civil engineering services`}
        ogImage={imageUrl}
      />
      {/* Hero Section with Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm mb-4 animate-fadeIn">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <span className="text-gray-400">/</span>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-white font-medium">{service.title}</span>
              </nav>

              {/* Icon and Title */}
              <div className="flex items-center mb-4 animate-slideIn">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-4xl mr-4">
                  {service.icon}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {service.title}
                </h1>
              </div>

              {/* Short Description */}
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-6 animate-fadeIn">
                {service.shortDescription}
              </p>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                {service.price && (
                  <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2">
                    <span className="text-yellow-400 mr-2">💰</span>
                    <span className="text-white font-medium">{service.price}</span>
                  </div>
                )}
                {service.timeline && (
                  <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2">
                    <span className="text-green-400 mr-2">⏰</span>
                    <span className="text-white font-medium">{service.timeline}</span>
                  </div>
                )}
                <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2">
                  <span className="text-blue-400 mr-2">✅</span>
                  <span className="text-white font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center">
                <div className="text-3xl mb-2">💰</div>
                <p className="text-sm text-gray-600 mb-1">Starting Price</p>
                <p className="text-2xl font-bold text-blue-600">{service.price || 'Custom Quote'}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
                <div className="text-3xl mb-2">⏰</div>
                <p className="text-sm text-gray-600 mb-1">Delivery Time</p>
                <p className="text-2xl font-bold text-green-600">{service.timeline || 'Varies'}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">98%</p>
              </div>
            </div>

            {/* Service Overview */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">📋</span>
                Service Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <span className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">✅</span>
                  What We Offer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">🔄</span>
                Our Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '1', title: 'Submit Request', desc: 'Share your project details' },
                  { step: '2', title: 'Get Quote', desc: 'Receive detailed pricing' },
                  { step: '3', title: 'We Work', desc: 'Our experts start working' },
                  { step: '4', title: 'Delivery', desc: 'Receive final deliverables' },
                ].map((process) => (
                  <div key={process.step} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-3 shadow-lg shadow-blue-600/30">
                      {process.step}
                    </div>
                    <h3 className="font-semibold mb-1">{process.title}</h3>
                    <p className="text-sm text-gray-600">{process.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-blue-100 mb-6">
                Contact us today for a free consultation and quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/services"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  View Other Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Services */}
      {otherServices.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Other <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Services</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {otherServices.map((otherService) => {
                const otherImage = otherService.image || placeholderImages[otherService.slug] || '/images/services/placeholder.svg';
                return (
                  <Link href={`/services/${otherService.slug}`} key={otherService._id || otherService.id} className="block group">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={otherImage}
                          alt={otherService.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 text-2xl">
                          {otherService.icon}
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                          {otherService.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {otherService.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}