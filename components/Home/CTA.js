import Link from 'next/link';
import { useT } from '../../lib/i18n';

export default function CTA() {
  const { t } = useT();
  const trust = t('home.cta.trust');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"></div>

      {/* Animated Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'https://media.istockphoto.com/id/2267714775/photo/silhouette-metal-structure-of-industry-warehouse-factory-building-with-steel-framework-in.jpg?s=1024x1024&w=is&k=20&c=LnklXm-e-fHrxvNMcq0X672K1gyAmANCIVaf92FZhDw=',
        backgroundSize: '30px 30px',
      }}></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-white font-semibold mb-6">
            {t('home.cta.badge')}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('home.cta.titleBuild')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{t('home.cta.titleAmazing')}</span>
          </h2>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('home.cta.getFreeQuote')}
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-blue-700 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {t('home.cta.viewServices')}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {trust.map((item) => (
              <div key={item} className="flex items-center text-blue-200">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
