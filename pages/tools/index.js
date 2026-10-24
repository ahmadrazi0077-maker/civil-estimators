import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import HERO_IMAGES from '../../lib/heroImages';
import { useT } from '../../lib/i18n';

const CALC_META = [
  { icon: '⚖️', href: '/tools/steel-weight' },
  { icon: '🏗️', href: '/tools/concrete' },
  { icon: '📏', href: '/tools/rebar' },
];
const VIEWER_META = [
  { icon: '📄', href: '/viewers/pdf-viewer' },
  { icon: '📐', href: '/viewers/dwg-viewer' },
  { icon: '🏢', href: '/viewers/ifc-viewer' },
];

export default function Tools() {
  const { t } = useT();
  const calculators = t('pages.tools.calculators').map((c, i) => ({ ...c, ...CALC_META[i] }));
  const viewers = t('pages.tools.viewers').map((v, i) => ({ ...v, ...VIEWER_META[i] }));

  return (
    <Layout>
      <PageHero
        image={HERO_IMAGES.tools}
        badge={t('pages.tools.badge')}
        title={t('pages.tools.heroTitle')}
        subtitle={t('pages.tools.heroSubtitle')}
        crumb={t('pages.tools.crumb')}
      />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">{t('pages.tools.calculatorsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {calculators.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer border border-gray-100 h-full">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">{t('pages.tools.viewersTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {viewers.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer border border-gray-100 h-full">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">{t('pages.tools.ctaTitle')}</h3>
            <p className="text-blue-100 mb-6">{t('pages.tools.ctaText')}</p>
            <Link href="/quote" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              {t('pages.tools.ctaBtn')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
