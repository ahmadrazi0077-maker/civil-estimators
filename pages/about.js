import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';
import { useT } from '../lib/i18n';

const STAT_META = [
  { value: 500, suffix: '+', icon: '🎯' },
  { value: 10, suffix: '+', icon: '⏰' },
  { value: 200, suffix: '+', icon: '😊' },
  { value: 25, suffix: '+', icon: '👥' },
];
const VALUE_ICONS = ['✅', '🤝', '⚡', '🎯', '⏰', '💪'];
const TEAM_META = [
  { name: 'John Engineer', initials: 'JE' },
  { name: 'Sarah Designer', initials: 'SD' },
  { name: 'Mike Estimator', initials: 'ME' },
  { name: 'David Structural', initials: 'DS' },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useT();

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

  const stats = t('pages.about.statsLabels').map((label, i) => ({ ...STAT_META[i], label }));
  const values = t('pages.about.values').map((v, i) => ({ ...v, icon: VALUE_ICONS[i] }));
  const team = t('pages.about.team').map((m, i) => ({ ...m, ...TEAM_META[i] }));
  const process = t('pages.about.process').map((s, i) => ({
    ...s,
    step: String(i + 1).padStart(2, '0'),
  }));

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        image={HERO_IMAGES.about}
        badge={t('pages.about.heroBadge')}
        title={<>{t('pages.about.heroTitleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{t('pages.about.heroTitleB')}</span></>}
        subtitle={t('pages.about.heroSubtitle')}
        crumb={t('pages.about.crumb')}
      />

      {/* Company Overview */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {t('pages.about.whoBadge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('pages.about.whoTitleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('pages.about.whoTitleB')}</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('pages.about.p1')}
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('pages.about.p2')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.about.p3')}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl"
                >
                  {t('pages.about.ourServices')}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all"
                >
                  {t('common.contactUs')}
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
              <h3 className="text-2xl font-bold mb-3">{t('pages.about.missionTitle')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.about.missionText')}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold mb-3">{t('pages.about.visionTitle')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.about.visionText')}
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
              {t('pages.about.valuesBadge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('pages.about.valuesTitleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('pages.about.valuesTitleB')}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('pages.about.valuesSubtitle')}
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
              {t('pages.about.processBadge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('pages.about.processTitleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('pages.about.processTitleB')}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('pages.about.processSubtitle')}
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
              {t('pages.about.teamBadge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('pages.about.teamTitleA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('pages.about.teamTitleB')}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('pages.about.teamSubtitle')}
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
            {t('pages.about.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('pages.about.ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all shadow-lg hover:scale-105"
            >
              {t('pages.about.ctaBtn1')}
            </Link>
            <Link
              href="/services"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all"
            >
              {t('pages.about.ctaBtn2')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
