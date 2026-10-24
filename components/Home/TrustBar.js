import { useT } from '../../lib/i18n';

export default function TrustBar() {
  const { t } = useT();
  const icons = ['🎯', '⚡', '🔒', '🌍'];
  const labels = t('home.trustBar');
  const items = labels.map((label, i) => ({ icon: icons[i], label }));

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
