import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';

// Home Components
import Hero from '../components/Home/Hero';
import TrustBar from '../components/Home/TrustBar';
import Services from '../components/Home/Services';
import WhyCivilPro from '../components/Home/WhyCivilPro';
import Portfolio from '../components/Portfolio';
import WhatYouReceive from '../components/Home/WhatYouReceive';
import HowItWorks from '../components/Home/HowItWorks';
import SoftwareExpertise from '../components/Home/SoftwareExpertise';
import Testimonials from '../components/Home/Testimonials';
import FreeTools from '../components/Home/FreeTools';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/Home/FinalCTA';

import { servicesAPI } from '../lib/api';

// Fallback Services - API fail hone par bhi show hongi
const FALLBACK_SERVICES = [
  {
    _id: '1',
    title: 'Steel Detailing',
    slug: 'steel-detailing',
    icon: '🏗️',
    shortDescription: 'Precise steel detailing including connection design, anchor bolt plans, and shop drawings.',
    description: 'Complete steel detailing for structural projects.',
    features: ['Shop drawings', 'Connection design', 'Anchor bolts'],
    price: 'From $500',
    timeline: '3-5 business days',
    image: '/images/services/steel-detailing.svg',
  },
  {
    _id: '2',
    title: 'Rebar Detailing',
    slug: 'rebar-detailing',
    icon: '🔩',
    shortDescription: 'Detailed reinforcement bar schedules, placement drawings, and bar bending schedules.',
    description: 'Complete rebar detailing services.',
    features: ['Bar schedules', 'Placement drawings'],
    price: 'From $400',
    timeline: '2-4 business days',
    image: '/images/services/rebar-detailing.svg',
  },
  {
    _id: '3',
    title: 'Quantity Takeoff',
    slug: 'quantity-takeoff',
    icon: '📏',
    shortDescription: 'Accurate material quantity calculations, area, volume, and component counting.',
    description: 'Precise quantity calculations.',
    features: ['Material quantities', 'Digital reports'],
    price: 'From $300',
    timeline: '1-3 business days',
    image: '/images/services/quantity-takeoff.svg',
  },
  {
    _id: '4',
    title: 'Cost Estimation',
    slug: 'cost-estimation',
    icon: '💰',
    shortDescription: 'Detailed cost analysis including material, labor, and equipment cost estimation.',
    description: 'Comprehensive cost estimation.',
    features: ['Material costs', 'Labor costs'],
    price: 'From $600',
    timeline: '4-7 business days',
    image: '/images/services/cost-estimation.svg',
  },
  {
    _id: '5',
    title: 'BOQ Preparation',
    slug: 'boq-preparation',
    icon: '📋',
    shortDescription: 'Professional Bill of Quantities preparation for tendering and procurement.',
    description: 'Detailed BOQ preparation.',
    features: ['Tender BOQ', 'Rate analysis'],
    price: 'From $450',
    timeline: '3-6 business days',
    image: '/images/services/boq-preparation.svg',
  },
  {
    _id: '6',
    title: 'Shop Drawings',
    slug: 'shop-drawings',
    icon: '📐',
    shortDescription: 'Detailed fabrication and installation shop drawings for construction.',
    description: 'Comprehensive shop drawings.',
    features: ['Fabrication drawings', 'Assembly details'],
    price: 'From $550',
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

      // 5 second timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );

      const dataPromise = servicesAPI.getAll();
      const data = await Promise.race([dataPromise, timeoutPromise]);

      if (Array.isArray(data) && data.length > 0) {
        console.log('✅ Using API services:', data.length);
        setServices(data);
      } else {
        console.log('⚠️ Empty response, using fallback');
        setServices(FALLBACK_SERVICES);
      }
    } catch (err) {
      console.log('⚠️ API failed/timeout, using fallback services');
      setServices(FALLBACK_SERVICES);
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