import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Home/Hero';
import TrustBar from '../components/Home/TrustBar';
import Services from '../components/Home/Services';
import WhyCivilPro from '../components/Home/WhyCivilPro';
import Portfolio from '../components/Portfolio';
import WhatYouReceive from '../components/Home/WhatYouReceive';
import HowItWorks from '../components/Home/HowItWorks';
import SoftwareExpertise from '../components/Home/SoftwareExpertise';
import FreeTools from '../components/Home/FreeTools';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/Home/FinalCTA';
import Testimonials from '../components/Home/Testimonials';
import { servicesAPI } from '../lib/api';

// Fallback services in case API fails
const FALLBACK_SERVICES = [
  {
    _id: '1',
    title: 'Steel Detailing',
    slug: 'steel-detailing',
    icon: '🏗️',
    shortDescription: 'Precise steel detailing services including connection design and erection drawings.',
    description: 'Complete steel detailing services for construction projects.',
    features: ['Shop drawings', 'Connection design', 'Anchor bolt plans', 'Material lists'],
    price: 'Starting from $500',
    timeline: '3-5 business days',
    image: '/images/services/steel-detailing.svg',
  },
  {
    _id: '2',
    title: 'Rebar Detailing',
    slug: 'rebar-detailing',
    icon: '🔩',
    shortDescription: 'Detailed reinforcement bar schedules and placement drawings.',
    description: 'Complete rebar detailing services.',
    features: ['Bar bending schedules', 'Placement drawings', 'Reinforcement details'],
    price: 'Starting from $400',
    timeline: '2-4 business days',
    image: '/images/services/rebar-detailing.svg',
  },
  {
    _id: '3',
    title: 'Quantity Takeoff',
    slug: 'quantity-takeoff',
    icon: '📏',
    shortDescription: 'Accurate quantity takeoff services for construction materials.',
    description: 'Precise material quantity calculations.',
    features: ['Material quantities', 'Area calculations', 'Digital reports'],
    price: 'Starting from $300',
    timeline: '1-3 business days',
    image: '/images/services/quantity-takeoff.svg',
  },
  {
    _id: '4',
    title: 'Cost Estimation',
    slug: 'cost-estimation',
    icon: '💰',
    shortDescription: 'Detailed cost estimation services for your projects.',
    description: 'Comprehensive cost estimation.',
    features: ['Material costs', 'Labor costs', 'Budget planning'],
    price: 'Starting from $600',
    timeline: '4-7 business days',
    image: '/images/services/cost-estimation.svg',
  },
  {
    _id: '5',
    title: 'BOQ Preparation',
    slug: 'boq-preparation',
    icon: '📋',
    shortDescription: 'Professional Bill of Quantities preparation for tendering.',
    description: 'Detailed BOQ preparation services.',
    features: ['Tender BOQ', 'Rate analysis', 'Documentation'],
    price: 'Starting from $450',
    timeline: '3-6 business days',
    image: '/images/services/boq-preparation.svg',
  },
  {
    _id: '6',
    title: 'Shop Drawings',
    slug: 'shop-drawings',
    icon: '📐',
    shortDescription: 'Detailed shop drawings for fabrication and construction.',
    description: 'Comprehensive shop drawings.',
    features: ['Fabrication drawings', 'Installation drawings', 'Assembly details'],
    price: 'Starting from $550',
    timeline: '4-6 business days',
    image: '/images/services/shop-drawings.svg',
  },
];

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
      setError(null);
      
      const data = await servicesAPI.getAll();
      
      // Check if data is valid
      if (Array.isArray(data) && data.length > 0) {
        setServices(data);
      } else {
        // Use fallback if API returns empty
        setServices(FALLBACK_SERVICES);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      // Use fallback services on error
      setServices(FALLBACK_SERVICES);
      setError(null); // Don't show error if we have fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* 1. HERO */}
      <Hero />
      
      {/* 2. TRUST BAR */}
      <TrustBar />
      
      {/* 3. SERVICES */}
      <Services 
        services={services} 
        loading={loading} 
        error={error} 
        onRetry={fetchServices} 
      />
      
      {/* 4. WHY CIVILPRO */}
      <WhyCivilPro />
      
      {/* 5. PROJECTS / CASE STUDIES */}
      <Portfolio />
      
      {/* 6. WHAT YOU RECEIVE */}
      <WhatYouReceive />
      
      {/* 7. HOW IT WORKS */}
      <HowItWorks />
      
      {/* 8. SOFTWARE / EXPERTISE */}
      <SoftwareExpertise />
      
      {/* 9. TESTIMONIALS */}
      <Testimonials />
      
      {/* 10. FREE TOOLS */}
      <FreeTools />
      
      {/* 11. FAQ */}
      <FAQ />
      
      {/* 12. FINAL CTA */}
      <FinalCTA />
    </Layout>
  );
}