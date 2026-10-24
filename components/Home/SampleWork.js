import { useT } from '../../lib/i18n';

export default function SampleWork() {
  const { t } = useT();
  const meta = [
    { icon: '🏗️', file: '/samples/sample-shop-drawing.pdf' },
    { icon: '📋', file: '/samples/sample-boq.pdf' },
    { icon: '💰', file: '/samples/sample-cost-estimate.pdf' },
  ];
  const samples = t('home.sampleWork.items').map((s, i) => ({ ...s, ...meta[i] }));

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t('home.sampleWork.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('home.sampleWork.titleSee')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              {t('home.sampleWork.titleBefore')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.sampleWork.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {samples.map((s, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
            >
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{s.desc}</p>
              <div className="flex gap-3">
                <a
                  href={s.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-blue-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {t('home.sampleWork.view')}
                </a>
                <a
                  href={s.file}
                  download
                  className="flex-1 text-center border-2 border-blue-600 text-blue-600 font-semibold px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  {t('home.sampleWork.download')}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          {t('home.sampleWork.note')}
        </p>
      </div>
    </section>
  );
}
