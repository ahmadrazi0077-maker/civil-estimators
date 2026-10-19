import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { inquiryAPI, uploadAPI } from '../lib/api';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    timeline: 'standard',
    message: '',
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    const valid = [];
    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" is larger than 10MB and was skipped.`);
        continue;
      }
      valid.push(file);
    }
    setFiles((prev) => [...prev, ...valid].slice(0, 5));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const readAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Upload drawings first
      let fileLinks = [];
      if (files.length > 0) {
        setUploading(true);
        for (const file of files) {
          try {
            const dataUrl = await readAsDataURL(file);
            const result = await uploadAPI.uploadImage(dataUrl, 'quote-drawings', file.name);
            const url = result?.url || result?.imageUrl || result?.data?.url;
            fileLinks.push(url ? `${file.name}: ${url}` : file.name);
          } catch (uploadErr) {
            console.error('Upload failed for', file.name, uploadErr);
            fileLinks.push(`${file.name} (upload failed - will be requested by email)`);
          }
        }
        setUploading(false);
      }

      const timelineLabel = formData.timeline === 'rush' ? 'Rush (24-48 hours)' : 'Standard (1-5 business days)';

      await inquiryAPI.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: `QUOTE REQUEST\nTimeline: ${timelineLabel}\n\nProject details:\n${formData.message}${
          fileLinks.length > 0 ? `\n\nAttached drawings/files:\n- ${fileLinks.join('\n- ')}` : ''
        }`,
      });

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', timeline: 'standard', message: '' });
      setFiles([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setUploading(false);
      setError(err.message || 'Failed to submit your quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { icon: '📤', title: 'Send Drawings', desc: 'Upload your project files (PDF, DWG, IFC)' },
    { icon: '💬', title: 'Get Free Quote', desc: 'Detailed pricing within 24 hours' },
    { icon: '✅', title: 'Confirm & Pay', desc: 'Approve quote, secure payment' },
    { icon: '📦', title: 'We Deliver', desc: 'Files within agreed timeline' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <PageHero
        image={HERO_IMAGES.quote}
        badge="✓ Free Consultation   ✓ 24hr Response   ✓ Confidential"
        title="Get a Free Quote"
        subtitle="Upload your drawings and get a free, no-obligation quote within 24 hours."
        crumb="Get a Quote"
      />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {steps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-5 text-center">
                <div className="text-3xl mb-2">{step.icon}</div>
                <p className="font-bold text-sm mb-1">{i + 1}. {step.title}</p>
                <p className="text-xs text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Request Your Quote</h2>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <p className="font-semibold text-green-800">Quote Request Sent!</p>
                    <p className="text-green-700 text-sm">Thank you! We'll review your drawings and get back to you within 24 hours.</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service" required value={formData.service} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="steel-detailing">Steel Detailing</option>
                      <option value="rebar-detailing">Rebar Detailing</option>
                      <option value="quantity-takeoff">Quantity Takeoff</option>
                      <option value="cost-estimation">Cost Estimation</option>
                      <option value="boq-preparation">BOQ Preparation</option>
                      <option value="shop-drawings">Shop Drawings</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'standard', label: 'Standard', desc: '1-5 business days' },
                      { value: 'rush', label: 'Rush', desc: '24-48 hours' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                          formData.timeline === opt.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio" name="timeline" value={opt.value}
                          checked={formData.timeline === opt.value}
                          onChange={handleChange} className="hidden"
                        />
                        <p className="font-semibold">{opt.label}</p>
                        <p className="text-xs text-gray-600">{opt.desc}</p>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Drawings <span className="text-gray-400 font-normal">(PDF, DWG, DXF, IFC, images — max 5 files, 10MB each)</span>
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all">
                    <span className="text-4xl mb-2">📤</span>
                    <span className="font-medium text-gray-700">Click to upload or drag & drop</span>
                    <span className="text-xs text-gray-500 mt-1">Your files are kept 100% confidential</span>
                    <input
                      type="file" multiple accept=".pdf,.dwg,.dxf,.ifc,.png,.jpg,.jpeg,.zip"
                      onChange={handleFiles} className="hidden"
                    />
                  </label>
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((file, i) => (
                        <li key={i} className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2 text-sm">
                          <span className="truncate">📎 {file.name} <span className="text-gray-400">({(file.size / 1024 / 1024).toFixed(1)} MB)</span></span>
                          <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700 ml-3 font-bold">✕</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message" required rows="5" value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your project: building type, size, scope of work, deadline..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading drawings...' : loading ? 'Sending...' : 'Upload Drawings & Get a Quote →'}
                </button>
                <p className="text-xs text-gray-500 text-center">🔒 Your drawings and project data are always protected.</p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-lg mb-4">Why CivilPro?</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start"><span className="mr-2">✓</span> Accuracy guaranteed — double-checked by senior engineers</li>
                  <li className="flex items-start"><span className="mr-2">⚡</span> Fast turnaround — most projects in 1-5 business days</li>
                  <li className="flex items-start"><span className="mr-2">💰</span> Competitive pricing — starting from $99, no hidden fees</li>
                  <li className="flex items-start"><span className="mr-2">🔒</span> 100% confidential — strict NDA on every project</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Prefer to talk?</h3>
                <p className="text-blue-100 text-sm mb-4">Reach out directly and we'll help you get started.</p>
                <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
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
