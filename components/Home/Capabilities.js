import { useT } from '../../lib/i18n';

const ICONS = ['📐', '🧮', '🤝'];

export default function Capabilities() {
  const { t } = useT();
  const items = t('home.capabilities.items');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            {t('home.capabilities.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.capabilities.title')}
          </h2>
          <p className="text-gray-600 text-lg">{t('home.capabilities.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-3xl mb-5 shadow-md">
                {ICONS[index] || '✅'}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
