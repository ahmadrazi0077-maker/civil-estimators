import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';
import { useT } from '../lib/i18n';

const STEP_ICONS = ['📤', '🔍', '🧾', '🤝', '📐', '✅'];

export default function ProcessPage() {
  const { t } = useT();
  const steps = t('pages.processPage.steps');

  return (
    <Layout>
      <SEO
        title={t('pages.processPage.seoTitle')}
        description={t('pages.processPage.seoDescription')}
      />
      <PageHero
        image={HERO_IMAGES.about}
        badge={t('pages.processPage.badge')}
        title={t('pages.processPage.title')}
        subtitle={t('pages.processPage.subtitle')}
        crumb={t('pages.processPage.title')}
      />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden sm:block" />
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex gap-5 sm:gap-8">
                    <div className="relative z-10 shrink-0 w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-md">
                      {STEP_ICONS[index] || '✅'}
                    </div>
                    <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100 flex-1">
                      <div className="text-xs font-bold tracking-widest text-blue-600 mb-1">
                        STEP {index + 1}
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t('pages.processPage.ctaTitle')}
              </h2>
              <p className="text-blue-100 mb-6">{t('pages.processPage.ctaText')}</p>
              <Link
                href="/quote"
                className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {t('pages.processPage.ctaBtn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
