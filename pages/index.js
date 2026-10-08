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
import Testimonials from '../components/Home/Testimonials';
import FreeTools from '../components/Home/FreeTools';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/Home/FinalCTA';
import { servicesAPI } from '../lib/api';

const FALLBACK_SERVICES = [
  {
    _id: '1',
    title: 'Steel Detailing',
    slug: 'steel-detailing',
    icon: '🏗️',
    shortDescription: 'Precise steel detailing including connection design, anchor bolt plans, and shop drawings.',
    description: 'Complete steel detailing for structural projects.',
    features: ['Shop drawings', 'Connection design', 'Anchor bolts'],
    price: 'Starting from $500',
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
    features: ['Bar bending schedules', 'Placement drawings'],
    price: 'Starting from $400',
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
    features: ['Material quantities', 'Area calculations'],
    price: 'Starting from $300',
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
    price: 'Starting from $600',
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
    price: 'Starting from $450',
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
    price: 'Starting from $550',
    timeline: '4-6 business days',
    image: '/images/services/shop-drawings.svg',
  },
];

export default function Home() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesAPI.getAll();
      if (Array.isArray(data) && data.length > 0) {
        setServices(data);
      }
    } catch (err) {
      console.log('Using fallback services');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Hero />
      <TrustBar />
      <Services services={services} loading={loading} onRetry={fetchServices} />
      <WhyCivilPro />
      <Portfolio />
      <WhatYouReceive />
      <HowItWorks />
      <SoftwareExpertise />
      <Testimonials />
      <FreeTools />
      <FAQ />
      <FinalCTA />
    </Layout>
  );
}