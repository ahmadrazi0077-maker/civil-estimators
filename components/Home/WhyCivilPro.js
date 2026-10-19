export default function WhyCivilPro() {
  const points = [
    {
      icon: '✓',
      title: 'Accuracy Guaranteed',
      desc: 'Every drawing and estimate is double-checked by senior engineers before delivery.',
    },
    {
      icon: '⚡',
      title: 'Fast Turnaround',
      desc: 'Most projects delivered within 1–5 business days. Rush services available.',
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      desc: 'Starting from $99. No hidden fees. Free initial consultation.',
    },
    {
      icon: '🔒',
      title: 'Confidential & Secure',
      desc: 'Your drawings and project data are always protected with strict NDA.',
    },
    {
      icon: '🌍',
      title: 'Global Experience',
      desc: 'Served 50+ countries with clients from USA, UK, UAE, Australia & more.',
    },
    {
      icon: '🎯',
      title: 'Engineering Excellence',
      desc: '10+ years experience. 500+ projects. 4.9/5 client rating.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">CivilPro Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by contractors, fabricators, and architects worldwide
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