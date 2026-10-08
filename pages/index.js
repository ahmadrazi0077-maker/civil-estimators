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



export default function Home() {
 
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
      <Services />
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