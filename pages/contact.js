import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';
import { useT } from '../lib/i18n';

const INFO_META = [
  {
    icon: '📧',
    value: 'info@civilpro.com',
    href: 'mailto:info@civilpro.com',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: '💬',
    value: '+1 (555) 123-4567',
    href: 'https://wa.me/15551234567?text=Hello! I would like to inquire about your civil engineering services.',
    color: 'from-green-500 to-green-700',
  },
  {
    icon: '📞',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: '📍',
    value: '123 Engineering St',
    subValue: 'City, State 12345',
    href: '#map',
    color: 'from-orange-500 to-orange-700',
  },
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState('contact');
  const { t } = useT();

  const contactInfo = INFO_META.map((meta, i) => {
    const titles = [
      t('pages.contact.emailTitle'),
      t('pages.contact.whatsappTitle'),
      t('pages.contact.callTitle'),
      t('pages.contact.visitTitle'),
    ];
    const subs = [
      t('pages.contact.emailSub'),
      t('pages.contact.whatsappSub'),
      t('pages.contact.callSub'),
      null,
    ];
    return { ...meta, title: titles[i], subValue: meta.subValue ?? subs[i] };
  });

  const faqs = t('pages.contact.faqs');

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        image={HERO_IMAGES.contact}
        badge={t('pages.contact.heroBadge')}
        title={<>{t('pages.contact.heroTitleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{t('pages.contact.heroTitleB')}</span></>}
        subtitle={t('pages.contact.heroSubtitle')}
        crumb={t('pages.contact.crumb')}
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
                    {t('pages.contact.formTitleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('pages.contact.formTitleB')}</span>
                  </h2>
                  <p className="text-gray-600">
                    {t('pages.contact.formSubtitle')}
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
                  {t('pages.contact.hoursTitle')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">{t('pages.contact.monFri')}</span>
                    <span className="font-semibold">{t('pages.contact.weekdayHours')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">{t('pages.contact.saturday')}</span>
                    <span className="font-semibold">{t('pages.contact.satHours')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('pages.contact.sunday')}</span>
                    <span className="font-semibold text-red-600">{t('pages.contact.closed')}</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">{t('pages.contact.quickTitle')}</h3>
                <p className="text-blue-100 mb-4">
                  {t('pages.contact.quickText')}
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:info@civilpro.com"
                    className="flex items-center bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors"
                  >
                    <span className="text-2xl mr-3">📧</span>
                    <div>
                      <p className="font-medium">{t('pages.contact.emailLabel')}</p>
                      <p className="text-sm text-blue-200">info@civilpro.com</p>
                    </div>
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors"
                  >
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <p className="font-medium">{t('pages.contact.phoneLabel')}</p>
                      <p className="text-sm text-blue-200">+1 (555) 123-4567</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4">{t('pages.contact.faqTitle')}</h3>
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
                <h2 className="text-2xl font-bold">{t('pages.contact.locationTitle')}</h2>
                <p className="text-gray-600">{t('pages.contact.locationSubtitle')}</p>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl flex-shrink-0 shadow-lg">
                    📍
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-lg font-bold mb-1">{t('pages.contact.companyName')}</p>
                    <p className="text-gray-600">123 Engineering St, City, State 12345</p>
                    <p className="text-sm text-gray-500 mt-1">{t('pages.contact.hoursLine')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('pages.contact.ctaTitle')}
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t('pages.contact.ctaText')}
            </p>
            <Link
              href="/services"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {t('pages.contact.ctaBtn')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
