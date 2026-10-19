import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO';
import ServiceCard from '../../components/ServiceCard';
import { servicesAPI } from '../../lib/api';
import PageHero from '../../components/PageHero';
import HERO_IMAGES from '../../lib/heroImages';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await servicesAPI.getAll();
      setServices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'price') return (a.price || '').localeCompare(b.price || '');
    return 0;
  });

  return (
    <Layout>
      <SEO
        title="Our Services"
        description="Explore our construction estimating services: steel detailing, rebar detailing, quantity takeoff, cost estimation, BOQ preparation & shop drawings — starting from $99."
        keywords="construction estimating services, steel detailing services, quantity takeoff services, cost estimation services, BOQ preparation, shop drawings"
      />
      <PageHero
        image={HERO_IMAGES.services}
        title="Our Services"
        subtitle="Professional civil engineering services tailored to meet your project requirements"
        crumb="Services"
      />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="default">Sort by: Default</option>
              <option value="title">Sort by: Title</option>
              <option value="price">Sort by: Price</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : sortedServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedServices.map((service) => (
                <ServiceCard key={service._id || service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No services found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}