import Link from 'next/link';

export default function FreeTools() {
  const tools = [
    { icon: '⚖️', title: 'Steel Weight Calculator', href: '/tools/steel-weight', desc: 'Calculate steel weight for any shape' },
    { icon: '🏗️', title: 'Concrete Calculator', href: '/tools/concrete', desc: 'Volume & material quantities' },
    { icon: '📏', title: 'Rebar Calculator', href: '/tools/rebar', desc: 'Bar bending schedules' },
    { icon: '💰', title: 'Cost Estimator', href: '/quote', desc: 'Instant project estimate' },
    { icon: '📄', title: 'PDF Viewer', href: '/viewers/pdf-viewer', desc: 'View drawings online' },
    { icon: '📐', title: 'DWG Viewer', href: '/viewers/dwg-viewer', desc: 'View AutoCAD files' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            100% Free
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Engineering Tools</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Powerful calculators and viewers - no signup required
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600">{tool.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}