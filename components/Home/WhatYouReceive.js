import { useT } from '../../lib/i18n';

export default function WhatYouReceive() {
  const { t } = useT();
  const icons = ['📐', '📋', '📏', '📊', '📁'];
  const deliverables = t('home.whatYouReceive.items').map((item, i) => ({
    ...item,
    icon: icons[i],
  }));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t('home.whatYouReceive.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('home.whatYouReceive.titleWhat')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('home.whatYouReceive.titleYouReceive')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.whatYouReceive.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {deliverables.map((item, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
