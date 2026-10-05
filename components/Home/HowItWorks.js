export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Send Drawings', desc: 'Upload your project files (PDF, DWG, IFC)' },
    { num: '02', title: 'Get Free Quote', desc: 'Receive detailed pricing within 24 hours' },
    { num: '03', title: 'Confirm & Pay', desc: 'Approve quote and make secure payment' },
    { num: '04', title: 'We Deliver', desc: 'Receive your files within agreed timeline' },
    { num: '05', title: 'Free Revisions', desc: 'Unlimited revisions until you\'re satisfied' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">It Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get started in 5 easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-2xl text-blue-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}