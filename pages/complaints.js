import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { inquiryAPI } from '../lib/api';

export default function Complaints() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reference: '',
    category: '',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await inquiryAPI.create({
        name: formData.name,
        email: formData.email,
        service: 'complaint',
        message: `COMPLAINT\nCategory: ${formData.category}\nProject/Order Reference: ${formData.reference || 'N/A'}\n\nDetails:\n${formData.details}`,
      });
      setSuccess(true);
      setFormData({ name: '', email: '', reference: '', category: '', details: '' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to submit your complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Complaints</h1>
          <p className="text-blue-100 mt-2">We take every complaint seriously and aim to resolve issues within 48 hours.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: '📝', title: '1. Submit', desc: 'Fill the form below with details of your issue.' },
            { icon: '🔍', title: '2. We Investigate', desc: 'Our team reviews your complaint within 24 hours.' },
            { icon: '🤝', title: '3. Resolution', desc: 'We contact you with a resolution within 48 hours.' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-5 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="font-bold text-sm mb-1">{s.title}</p>
              <p className="text-xs text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">File a Complaint</h2>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="font-semibold text-green-800">Complaint Received</p>
                <p className="text-green-700 text-sm">Thank you. We will investigate and get back to you within 48 hours.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project / Order Reference
                </label>
                <input
                  type="text" name="reference" value={formData.reference} onChange={handleChange}
                  placeholder="e.g. Order #1234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category" required value={formData.category} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="quality">Quality of work</option>
                  <option value="delay">Delivery delay</option>
                  <option value="billing">Billing / payment issue</option>
                  <option value="communication">Communication issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complaint Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="details" required rows="5" value={formData.details} onChange={handleChange}
                placeholder="Please describe the issue in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="text-gray-700">
            Prefer email? Write to us at{' '}
            <a href="mailto:info@civilpro.com" className="text-blue-600 font-semibold hover:underline">info@civilpro.com</a>
            {' '}or{' '}
            <Link href="/contact" className="text-blue-600 font-semibold hover:underline">contact us here</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
