import { useT } from '../../lib/i18n';

export default function WhyCivilPro() {
  const { t } = useT();
  const icons = ['✓', '⚡', '💰', '🔒', '🌍', '🎯'];
  const points = t('home.why.points').map((p, i) => ({ ...p, icon: icons[i] }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t('home.why.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('home.why.titleWhy')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('home.why.titleBrand')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.why.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {points.map((point, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
