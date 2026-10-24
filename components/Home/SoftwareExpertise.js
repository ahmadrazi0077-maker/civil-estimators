import { useT } from '../../lib/i18n';

export default function SoftwareExpertise() {
  const { t } = useT();
  const softwares = [
    { name: 'Tekla Structures', icon: '🏗️' },
    { name: 'AutoCAD', icon: '📐' },
    { name: 'Revit', icon: '🏢' },
    { name: 'STAAD Pro', icon: '📊' },
    { name: 'ETABS', icon: '🏛️' },
    { name: 'Navisworks', icon: '🎯' },
    { name: 'Bluebeam', icon: '📄' },
    { name: 'MS Excel', icon: '📊' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t('home.software.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('home.software.titleSoftware')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{t('home.software.titleTools')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.software.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {softwares.map((sw, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-5xl mb-3">{sw.icon}</div>
              <p className="font-semibold text-gray-800">{sw.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
