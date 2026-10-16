import Link from 'next/link';
import Layout from '../components/Layout/Layout';

export default function TermsOfService() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: 'By accessing or using CivilPro Services website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
    },
    {
      id: 'services',
      title: 'Services Description',
      items: [
        {
          subtitle: 'Scope of Services',
          text: 'CivilPro Services provides civil engineering services including:',
          list: [
            'Steel Detailing',
            'Rebar Detailing',
            'Quantity Takeoff',
            'Cost Estimation',
            'BOQ Preparation',
            'Shop Drawings',
          ],
        },
        {
          subtitle: 'Service Modifications',
          text: 'We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.',
        },
      ],
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      content: 'When using our services, you agree to:',
      list: [
        'Provide accurate and complete information',
        'Use services only for lawful purposes',
        'Not infringe on intellectual property rights',
        'Not upload malicious content',
        'Maintain confidentiality of account credentials',
      ],
    },
    {
      id: 'payments',
      title: 'Payments and Fees',
      items: [
        {
          text: 'Payment terms:',
          list: [
            'All fees are quoted in USD unless otherwise stated',
            'Payment is due upon receipt of invoice',
            'Late payments may incur additional charges',
            'Prices may change with prior notice',
          ],
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: 'All content, designs, drawings, and materials created by CivilPro Services remain our intellectual property until full payment is received. Upon full payment, ownership transfers to the client.',
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      content: 'We agree to maintain the confidentiality of all project-related information shared with us. We will not disclose your proprietary information to third parties without your consent, except as required by law.',
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of Liability',
      content: 'CivilPro Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service.',
    },
    {
      id: 'warranty',
      title: 'Disclaimer of Warranties',
      content: 'Our services are provided "as is" without any warranties, express or implied. We do not guarantee that our services will meet your specific requirements or that they will be error-free.',
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      content: 'You agree to indemnify and hold CivilPro Services harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.',
    },
    {
      id: 'termination',
      title: 'Termination',
      content: 'We reserve the right to terminate or suspend your access to our services at any time, with or without cause, and without prior notice.',
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which CivilPro Services operates.',
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      content: 'We may update these Terms of Service from time to time. Continued use of our services after changes constitutes acceptance of the new terms.',
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: 'For questions about these Terms of Service, please contact us at:',
      list: [
        'Email: legal@civilpro.com',
        'Phone: +1 (555) 123-4567',
        'Address: 123 Engineering St, City, State 12345',
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100">Last Updated: January 1, 2024</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Quick Navigation */}
              <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                <h2 className="font-bold mb-3">Quick Navigation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section) => (
                  <div key={section.id} id={section.id}>
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                    
                    {section.content && (
                      <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                    )}
                    
                    {section.items && section.items.map((item, idx) => (
                      <div key={idx} className="mb-4">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold mb-2">{item.subtitle}</h3>
                        )}
                        {item.text && (
                          <p className="text-gray-700 mb-2">{item.text}</p>
                        )}
                      </div>
                    ))}
                    
                    {section.list && (
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {section.list.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Agreement Box */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Acceptance of Terms</h3>
                <p className="text-blue-100 mb-4">
                  By using our services, you acknowledge that you have read and agree to these Terms of Service.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}