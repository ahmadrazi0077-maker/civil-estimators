import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a comprehensive range of civil engineering services including steel detailing, rebar detailing, quantity takeoff, cost estimation, BOQ preparation, and shop drawings.',
    },
    {
      question: 'How quickly can you deliver projects?',
      answer: 'Delivery times vary depending on the project complexity. Most standard services are delivered within 2-5 business days. Rush services are available upon request.',
    },
    {
      question: 'What software do you use?',
      answer: 'We use industry-standard software including AutoCAD, Tekla Structures, Revit, and STAAD Pro to ensure accuracy and compatibility with your requirements.',
    },
    {
      question: 'Do you provide revisions?',
      answer: 'Yes, we provide revisions to ensure the final deliverables meet your exact requirements. The number of revisions depends on the service package you choose.',
    },
    {
      question: 'How do you ensure quality?',
      answer: 'We have a multi-level quality check process where every deliverable is reviewed by senior engineers before delivery to ensure accuracy and compliance with standards.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}