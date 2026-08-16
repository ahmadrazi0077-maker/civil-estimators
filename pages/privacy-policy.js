import Link from 'next/link';
import Layout from '../components/Layout/Layout';

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: 'CivilPro Services ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      items: [
        {
          subtitle: 'Personal Information',
          text: 'We may collect personal information that you voluntarily provide to us, including:',
          list: [
            'Name and contact information (email address, phone number)',
            'Company name and job title',
            'Project details and requirements',
            'Billing and payment information',
            'Communication preferences',
          ],
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'When you visit our website, we automatically collect certain information:',
          list: [
            'IP address and browser type',
            'Device information',
            'Pages visited and time spent',
            'Referring website',
            'Cookies and similar technologies',
          ],
        },
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Your Information',
      items: [
        {
          text: 'We use the information we collect to:',
          list: [
            'Provide and maintain our services',
            'Process your inquiries and requests',
            'Send you quotes and project proposals',
            'Communicate with you about your projects',
            'Send newsletters and marketing communications (with your consent)',
            'Improve our website and services',
            'Comply with legal obligations',
          ],
        },
      ],
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with:',
      list: [
        'Service providers who assist in our operations',
        'Professional advisors (lawyers, accountants)',
        'Law enforcement when required by law',
        'Business partners with your consent',
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet is 100% secure.',
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. You can control cookies through your browser settings.',
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: 'You have the right to:',
      list: [
        'Access your personal information',
        'Correct inaccurate information',
        'Request deletion of your information',
        'Opt-out of marketing communications',
        'Withdraw consent at any time',
        'Lodge a complaint with a supervisory authority',
      ],
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links',
      content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies before providing any personal information.',
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      content: 'Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.',
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.',
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy, please contact us at:',
      list: [
        'Email: privacy@civilpro.com',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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

              {/* Contact Box */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Questions?</h3>
                <p className="text-blue-100 mb-4">
                  If you have any questions about this Privacy Policy, please contact us.
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