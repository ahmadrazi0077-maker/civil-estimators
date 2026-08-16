import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import Stats from '../components/Home/Stats';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Home/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import CTA from '../components/Home/CTA';
import { servicesAPI } from '../lib/api';

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await servicesAPI.getAll();
      setServices(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Hero />
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchServices}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <Services services={services} />
          <Stats />
          <Portfolio />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Newsletter />
          <CTA />
        </>
      )}
    </Layout>
  );
}