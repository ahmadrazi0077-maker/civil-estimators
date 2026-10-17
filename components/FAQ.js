import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a comprehensive range of civil engineering services including steel detailing, rebar detailing, quantity takeoff, cost estimation, BOQ preparation, and shop drawings — all delivered with fast turnaround and engineer-checked accuracy.',
    },
    {
      question: 'How quickly can you deliver projects?',
      answer: 'Most standard services are delivered within 2–5 business days depending on complexity. Need it faster? Rush delivery (24–48 hours) is available on request — just mention it in your quote.',
    },
    {
      question: 'What software do you use?',
      answer: 'We work in industry-standard tools including AutoCAD, Tekla Structures, Revit, PlanSwift, and Bluebeam Revu, so our files drop straight into your workflow with zero compatibility issues.',
    },
    {
      question: 'Do you provide revisions?',
      answer: 'Yes. Every plan includes free revisions — 2 on Starter, 5 on Professional, and unlimited on Premium — so the final deliverables match your exact requirements before you pay the balance.',
    },
    {
      question: 'How do you ensure quality?',
      answer: 'Every deliverable passes a multi-level quality check: the detailer self-reviews, then a senior engineer verifies dimensions, codes, and compliance before anything reaches you.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Questions
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about working with CivilPro.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Still have questions? We reply within a few hours.</p>
            <Link
              href="/contact"
              className="inline-flex items-center px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Contact Our Team
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index, open, onToggle }) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(open ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [open ]);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        open
          ? 'border-blue-200 bg-blue-50/40 shadow-lg shadow-blue-100/60'
          : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full px-5 sm:px-6 py-5 flex items-center gap-4 text-left focus:outline-none"
      >
        {/* Number badge */}
        <span
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
            open ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className={`flex-1 font-semibold text-[15px] sm:text-base transition-colors duration-300 ${
          open ? 'text-blue-900' : 'text-gray-800'
        }`}>
          {faq.question}
        </span>

        {/* Plus / minus icon */}
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            open ? 'bg-blue-600 rotate-45' : 'bg-gray-100'
          }`}
        >
          <svg
            className={`w-4 h-4 transition-colors duration-300 ${open ? 'text-white' : 'text-gray-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      {/* Animated answer */}
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
      >
        <div className="px-5 sm:px-6 pb-6 pl-[4.25rem] sm:pl-[4.5rem]">
          <p className="text-gray-600 leading-relaxed text-[15px] border-l-2 border-blue-200 pl-4">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
