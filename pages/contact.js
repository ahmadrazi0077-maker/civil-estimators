import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('contact');

 const contactInfo = [
  {
    icon: '📧',
    title: 'Email Us',
    value: 'info@civilpro.com',
    subValue: 'We reply within 24 hours',
    href: 'mailto:info@civilpro.com',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    value: '+1 (555) 123-4567',
    subValue: 'Quick response guaranteed',
    href: 'https://wa.me/15551234567?text=Hello! I would like to inquire about your civil engineering services.',
    color: 'from-green-500 to-green-700',
  },
  {
    icon: '📞',
    title: 'Call Us',
    value: '+1 (555) 123-4567',
    subValue: 'Mon-Sat, 9AM-6PM',
    href: 'tel:+15551234567',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: '📍',
    title: 'Visit Us',
    value: '123 Engineering St',
    subValue: 'City, State 12345',
    href: '#map',
    color: 'from-orange-500 to-orange-700',
  },
];

  const faqs = [
    {
      question: 'How quickly can you respond to inquiries?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.',
    },
    {
      question: 'Do you provide free consultations?',
      answer: 'Yes, we offer free initial consultations to understand your project requirements and provide recommendations.',
    },
    {
      question: 'What information should I provide for a quote?',
      answer: 'Project drawings, specifications, scope of work, and timeline are helpful for providing accurate quotes.',
    },
    {
      question: 'Can you handle urgent projects?',
      answer: 'Yes, we have a dedicated team for rush projects. Contact us with your timeline requirements.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/2267714775/photo/silhouette-metal-structure-of-industry-warehouse-factory-building-with-steel-framework-in.jpg?s=1024x1024&w=is&k=20&c=LnklXm-e-fHrxvNMcq0X672K1gyAmANCIVaf92FZhDw="
          alt="Contact CivilPro Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/70 to-black/80"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <nav className="flex items-center space-x-2 text-sm mb-6 animate-fadeIn">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <span className="text-gray-400">/</span>
                <span className="text-white font-medium">Contact Us</span>
              </nav>

              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white mb-4">
                Get In Touch
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slideIn">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Talk</span>
              </h1>

              <p className="text-xl text-gray-200 max-w-3xl animate-fadeIn">
                We're here to help with your construction project needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-10">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {info.icon}
                </div>
                <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                <p className="text-gray-800 font-medium mb-1">{info.value}</p>
                <p className="text-sm text-gray-500">{info.subValue}</p>
              </a>
            ))}
          </div>

          {/* Main Content */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">
                    Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Message</span>
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Working Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🕐</span>
                  Working Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-red-600">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                <p className="text-blue-100 mb-4">
                  Prefer to reach out directly? Use any of these methods:
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:info@civilpro.com"
                    className="flex items-center bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors"
                  >
                    <span className="text-2xl mr-3">📧</span>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-blue-200">info@civilpro.com</p>
                    </div>
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors"
                  >
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-blue-200">+1 (555) 123-4567</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4">Common Questions</h3>
                <div className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index}>
                      <p className="font-semibold mb-1">{faq.question}</p>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16" id="map">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Our Location</h2>
                <p className="text-gray-600">Find us at our office</p>
              </div>
              <div className="relative h-[400px] bg-gray-200">
                {/* Placeholder Map */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-xl font-bold mb-2">Map Placeholder</p>
                    <p className="text-gray-600">Add Google Maps integration here</p>
                  </div>
                </div>
                {/* Uncomment to use Google Maps
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459382!3d40.74844797932839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1645564756836!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
                */}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get in touch with us today for a free consultation and quote. Our team is ready to help you succeed.
            </p>
            <Link
              href="/services"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}