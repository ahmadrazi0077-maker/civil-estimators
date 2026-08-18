import Layout from '../../components/Layout/Layout';
import Link from 'next/link';

export default function ViewersIndex() {
  const viewers = [
    {
      title: 'PDF Drawing Viewer',
      description: 'View PDF drawings, plans, and documents online',
      icon: '📄',
      href: '/viewers/pdf-viewer',
      color: 'from-red-500 to-red-700',
      features: ['Zoom & Pan', 'Page navigation', 'Print support'],
    },
    {
      title: 'DWG Viewer',
      description: 'View AutoCAD DWG/DXF files directly in browser',
      icon: '📐',
      href: '/viewers/dwg-viewer',
      color: 'from-blue-500 to-blue-700',
      features: ['DWG/DXF support', 'Layer control', 'Measurement tools'],
    },
    {
      title: 'IFC Viewer',
      description: 'View 3D BIM models with full rotation',
      icon: '🏗️',
      href: '/viewers/ifc-viewer',
      color: 'from-green-500 to-green-700',
      features: ['3D rotation', 'Section views', 'Element info'],
    },
  ];

  return (
    <Layout>
      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Drawing Viewers</h1>
            <p className="text-xl text-gray-600">View your engineering drawings online</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {viewers.map((viewer) => (
              <Link
                key={viewer.title}
                href={viewer.href}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                  <div className={`h-40 bg-gradient-to-br ${viewer.color} flex items-center justify-center`}>
                    <span className="text-6xl">{viewer.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {viewer.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{viewer.description}</p>
                    <ul className="space-y-2">
                      {viewer.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}