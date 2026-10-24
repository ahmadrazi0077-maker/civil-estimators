import { useT } from '../../lib/i18n';

export default function Guarantees() {
  const { t } = useT();
  const icons = ['🎯', '🔄', '🔒', '⚡'];
  const guarantees = t('home.guarantees.items').map((g, i) => ({ ...g, icon: icons[i] }));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t('home.guarantees.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('home.guarantees.titleOrdering')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
              {t('home.guarantees.titleRiskFree')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.guarantees.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {guarantees.map((g, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow flex items-center justify-center text-3xl mb-4">
                {g.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{g.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
