import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';

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
      <PageHero
        image={HERO_IMAGES.contact}
        badge="Get In Touch"
        title={<>Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Talk</span></>}
        subtitle="We're here to help with your construction project needs"
        crumb="Contact Us"
      />

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

          {/* Map Section — add a real map embed here once the office address is finalized.
              Example: replace the card below with a Google Maps / OpenStreetMap iframe. */}
          <div className="mt-16" id="map">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Our Location</h2>
                <p className="text-gray-600">Find us at our office</p>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl flex-shrink-0 shadow-lg">
                    📍
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-lg font-bold mb-1">CivilPro Engineering Services</p>
                    <p className="text-gray-600">123 Engineering St, City, State 12345</p>
                    <p className="text-sm text-gray-500 mt-1">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
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