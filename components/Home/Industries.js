import { useT } from '../../lib/i18n';

const ICONS = ['🏭', '🏢', '🏠', '🏗️', '🧱', '👷', '📐'];

export default function Industries() {
  const { t } = useT();
  const items = t('home.industries.items');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            {t('home.industries.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.industries.title')}
          </h2>
          <p className="text-gray-600 text-lg">{t('home.industries.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{ICONS[index] || '✅'}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
