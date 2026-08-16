import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$299',
      description: 'Perfect for small projects',
      features: [
        'Single service',
        '2 revisions',
        '5-day delivery',
        'Email support',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$599',
      description: 'Best for medium projects',
      features: [
        'Multiple services',
        '5 revisions',
        '3-day delivery',
        'Priority support',
        'Dedicated manager',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large scale projects',
      features: [
        'All services',
        'Unlimited revisions',
        '24-hour delivery',
        '24/7 support',
        'Custom solutions',
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing Plans</h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Choose the perfect plan for your project needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-md p-8 ${
                plan.highlighted ? 'border-2 border-blue-600 transform scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-500">/project</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}