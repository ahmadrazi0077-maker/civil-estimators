import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { value: 500, suffix: '+', label: 'Projects Completed', icon: '🎯' },
    { value: 10, suffix: '+', label: 'Years Experience', icon: '⏰' },
    { value: 200, suffix: '+', label: 'Happy Clients', icon: '😊' },
    { value: 25, suffix: '+', label: 'Team Members', icon: '👥' },
  ];

  const values = [
    {
      icon: '✅',
      title: 'Quality First',
      description: 'We deliver high-quality work that meets and exceeds industry standards.',
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'We build long-term relationships based on trust and transparency.',
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'We embrace new technologies and methodologies to improve our services.',
    },
    {
      icon: '🎯',
      title: 'Client Focus',
      description: 'Your success is our priority. We tailor our services to your needs.',
    },
    {
      icon: '⏰',
      title: 'Timely Delivery',
      description: 'We understand deadlines and deliver projects on time, every time.',
    },
    {
      icon: '💪',
      title: 'Expertise',
      description: 'Our team brings years of specialized experience to every project.',
    },
  ];

  const team = [
    {
      name: 'John Engineer',
      role: 'Founder & CEO',
      bio: '15+ years experience in civil engineering and project management.',
      expertise: ['Structural Engineering', 'Project Management', 'Steel Detailing'],
      initials: 'JE',
    },
    {
      name: 'Sarah Designer',
      role: 'Head of Detailing',
      bio: 'Expert in steel detailing and rebar detailing with 10 years of experience.',
      expertise: ['Steel Detailing', 'Rebar Detailing', 'Shop Drawings'],
      initials: 'SD',
    },
    {
      name: 'Mike Estimator',
      role: 'Cost Estimation Lead',
      bio: 'Specialist in construction cost analysis and BOQ preparation.',
      expertise: ['Cost Estimation', 'BOQ Preparation', 'Quantity Takeoff'],
      initials: 'ME',
    },
    {
      name: 'David Structural',
      role: 'Senior Structural Engineer',
      bio: 'Experienced in complex structural design and analysis.',
      expertise: ['Structural Design', 'Analysis', 'Consulting'],
      initials: 'DS',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your project requirements and goals',
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Detailed project plan and timeline creation',
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Our experts work diligently on your project',
    },
    {
      step: '04',
      title: 'Quality Check',
      description: 'Thorough review and quality assurance',
    },
    {
      step: '05',
      title: 'Delivery',
      description: 'Final deliverables with full support',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        image={HERO_IMAGES.about}
        badge="About Our Company"
        title={<>Building Trust Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Excellence</span></>}
        subtitle="Your trusted partner in civil engineering services for over a decade"
        crumb="About Us"
      />

      {/* Company Overview */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                A Team of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Passionate Engineers</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We are a team of experienced civil engineers and detailers dedicated to providing 
                high-quality engineering services to the construction industry.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With over 10 years of experience, we specialize in steel detailing, rebar detailing, 
                quantity takeoff, cost estimation, BOQ preparation, and shop drawings.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our commitment to accuracy, quality, and timely delivery has made us a trusted 
                partner for contractors, architects, and developers worldwide.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl"
                >
                  Our Services
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                      <div className="text-4xl mb-2">{stat.icon}</div>
                      <p className="text-3xl font-bold text-blue-600">{stat.value}{stat.suffix}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide accurate, reliable, and timely engineering services that help our 
                clients complete their projects successfully and efficiently.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading provider of civil engineering services, recognized for 
                excellence, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Drives Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values shape everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A streamlined process for successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-blue-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Experts</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The people behind our success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform shadow-lg">
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all shadow-lg hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}