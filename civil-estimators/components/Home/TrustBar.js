export default function TrustBar() {
  const items = [
    { icon: '🎯', label: 'Engineering-Focused' },
    { icon: '⚡', label: 'Fast Turnaround' },
    { icon: '🔒', label: '100% Confidential' },
    { icon: '🌍', label: 'International Clients' },
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-3">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-sm md:text-base font-semibold text-gray-800">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}