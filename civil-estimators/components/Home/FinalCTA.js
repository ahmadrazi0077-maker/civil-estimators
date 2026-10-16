import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"></div>
      
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '30px 30px',
      }}></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Upload your drawings and get a free, no-obligation quote within 24 hours.
          </p>
          
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transition-all hover:scale-105"
          >
            <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Drawings & Get a Quote
          </Link>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <span className="flex items-center">✓ Free Consultation</span>
            <span className="flex items-center">✓ 24hr Response</span>
            <span className="flex items-center">✓ Confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
}