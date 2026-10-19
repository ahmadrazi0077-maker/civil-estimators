export default function SampleWork() {
  const samples = [
    {
      icon: '🏗️',
      title: 'Sample Shop Drawing',
      desc: 'Structural steel beam detail with connections, dimensions & title block (PDF)',
      file: '/samples/sample-shop-drawing.pdf',
    },
    {
      icon: '📋',
      title: 'Sample BOQ',
      desc: 'Bill of Quantities excerpt with itemized rates & amounts (PDF)',
      file: '/samples/sample-boq.pdf',
    },
    {
      icon: '💰',
      title: 'Sample Cost Estimate',
      desc: 'CSI-division cost estimate summary with totals (PDF)',
      file: '/samples/sample-cost-estimate.pdf',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Sample Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            See the Quality{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Before You Order
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Download real samples of our deliverables — no signup needed. This is exactly the
            standard your project will receive.
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
                  View
                </a>
                <a
                  href={s.file}
                  download
                  className="flex-1 text-center border-2 border-blue-600 text-blue-600 font-semibold px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          All samples are watermarked illustrations of our deliverable format.
        </p>
      </div>
    </section>
  );
}
