import { useState } from 'react';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Project Manager',
      company: 'ABC Construction',
      content: 'Excellent service! Their steel detailing work is accurate and delivered on time. The team is professional and responsive.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=John+Smith&background=2563eb&color=fff',
      project: 'Commercial Tower Project',
    },
    {
      name: 'Sarah Johnson',
      role: 'Architect',
      company: 'Design Studio Inc.',
      content: 'Very professional team. Their cost estimation helped us save significantly on our project. The reports were detailed and easy to understand.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=dc2626&color=fff',
      project: 'Residential Complex',
    },
    {
      name: 'Mike Wilson',
      role: 'Contractor',
      company: 'Wilson Builders',
      content: 'The quality of shop drawings is outstanding. They understand complex requirements and deliver exceptional results every time.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=059669&color=fff',
      project: 'Industrial Warehouse',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full opacity-50"></div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              "
            </div>

            {/* Content */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(activeTestimonial)].map(() => null)}
              </div>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">
                "{testimonials[activeTestimonial].content}"
              </p>

              <div className="flex items-center justify-center mb-6">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <p className="font-bold text-lg">{testimonials[activeTestimonial].name}</p>
                  <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                  <p className="text-blue-600 text-sm">{testimonials[activeTestimonial].company}</p>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < testimonials[activeTestimonial].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                Project: {testimonials[activeTestimonial].project}
              </p>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'w-8 bg-blue-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}