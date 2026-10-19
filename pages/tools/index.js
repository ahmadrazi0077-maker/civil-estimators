import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import HERO_IMAGES from '../../lib/heroImages';

const calculators = [
  { icon: '⚖️', title: 'Steel Weight Calculator', href: '/tools/steel-weight', desc: 'Calculate steel weight for bars, plates & pipes' },
  { icon: '🏗️', title: 'Concrete Calculator', href: '/tools/concrete', desc: 'Volume & material quantities (cement, sand, aggregate)' },
  { icon: '📏', title: 'Rebar Calculator', href: '/tools/rebar', desc: 'Bar weights & bending schedule totals' },
];

const viewers = [
  { icon: '📄', title: 'PDF Viewer', href: '/viewers/pdf-viewer', desc: 'View drawings online' },
  { icon: '📐', title: 'DWG Viewer', href: '/viewers/dwg-viewer', desc: 'View AutoCAD files' },
  { icon: '🏢', title: 'IFC Viewer', href: '/viewers/ifc-viewer', desc: 'View BIM models' },
];

export default function Tools() {
  return (
    <Layout>
      <PageHero
        image={HERO_IMAGES.tools}
        badge="100% Free — No Signup Required"
        title="Free Engineering Tools"
        subtitle="Powerful calculators and viewers for your construction projects."
        crumb="Free Tools"
      />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {calculators.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer border border-gray-100 h-full">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">Drawing Viewers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {viewers.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer border border-gray-100 h-full">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Need a Professional Estimate?</h3>
            <p className="text-blue-100 mb-6">Our engineers deliver accurate takeoffs within 1-5 business days.</p>
            <Link href="/quote" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
