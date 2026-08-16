export default function Stats() {
  const stats = [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Years Experience', value: '10+' },
    { label: 'Happy Clients', value: '200+' },
    { label: 'Team Members', value: '25+' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}