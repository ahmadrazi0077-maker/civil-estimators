import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      unit: 'starting price',
      description: 'Perfect for small takeoffs and single-trade estimates.',
      features: [
        'Single service (takeoff or estimate)',
        'Up to 2 revisions',
        '3-day standard delivery',
        'PDF + Excel deliverables',
        'Email support',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$149',
      unit: 'starting price',
      description: 'Best for contractors bidding mid-size projects.',
      features: [
        'Takeoff + cost estimate bundle',
        'Up to 5 revisions',
        '48-hour priority delivery',
        'PDF + Excel deliverables',
        'Markup drawings included',
        'Priority email support',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$199',
      unit: 'starting price',
      description: 'Full documentation for complex or fast-track jobs.',
      features: [
        'Detailing + BOQ + shop drawings',
        'Unlimited revisions',
        '24-hour rush delivery',
        'All file formats (DWG, PDF, Excel)',
        'Dedicated project manager',
        'Phone + email support',
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional estimation services starting at just $99. No hidden fees —
            you approve the quote before we start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.highlighted
                  ? 'border-2 border-blue-600 shadow-2xl shadow-blue-600/15 md:scale-[1.04]'
                  : 'border border-gray-200 shadow-lg shadow-gray-200/50 hover:shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-5 min-h-[2.5rem]">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-gray-900 tracking-tight">{plan.price}</span>
                <span className="block text-sm text-gray-500 mt-1">{plan.unit}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-gray-700">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                      plan.highlighted ? 'bg-blue-600' : 'bg-green-500'
                    }`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/quote"
                className={`block text-center py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02]'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Get a Quote
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Need something custom?{' '}
          <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
            Contact us
          </Link>{' '}
          for a tailored estimate.
        </p>
      </div>
    </section>
  );
}
