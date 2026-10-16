import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { inquiryAPI, uploadAPI } from '../lib/api';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

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
  const [uploadProgress, setUploadProgress] = useState(0);
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
    
    const combined = [...files, ...valid].slice(0, MAX_FILES);
    setFiles(combined);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setError('');
  };

  const readAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return '📄';
    if (['dwg', 'dxf'].includes(ext)) return '📐';
    if (['ifc'].includes(ext)) return '🏗️';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return '🖼️';
    if (['zip', 'rar'].includes(ext)) return '🗜️';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx'].includes(ext)) return '📊';
    return '📎';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setUploadProgress(0);

    try {
      // Upload all files first
      const uploadedAttachments = [];
      
      if (files.length > 0) {
        setUploading(true);
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          try {
            const dataUrl = await readAsDataURL(file);
            
            const result = await uploadAPI.uploadImage(
              dataUrl, 
              'quote-drawings', 
              file.name
            );
            
            console.log('Upload result for', file.name, ':', result);

            if (result && result.url) {
              uploadedAttachments.push({
                name: file.name,
                url: result.url,
                publicId: result.publicId || '',
                size: file.size,
                type: file.type || file.name.split('.').pop(),
              });
            }
          } catch (uploadErr) {
            console.error('Upload failed for', file.name, uploadErr);
            // Still add file info without URL
            uploadedAttachments.push({
              name: file.name,
              url: '',
              publicId: '',
              size: file.size,
              type: file.type || file.name.split('.').pop(),
              uploadFailed: true,
            });
          }
          
          setUploadProgress(Math.round(((i + 1) / files.length) * 100));
        }
        
        setUploading(false);
      }

      // Build message with attachments info
      const timelineLabel = formData.timeline === 'rush' 
        ? 'Rush (24-48 hours)' 
        : 'Standard (1-5 business days)';

      const messageWithFiles = `QUOTE REQUEST\nTimeline: ${timelineLabel}\n\nProject details:\n${formData.message}${
        uploadedAttachments.length > 0 
          ? `\n\n📎 Attached files (${uploadedAttachments.length}):\n${uploadedAttachments.map(f => `- ${f.name}`).join('\n')}` 
          : ''
      }`;

      // Submit inquiry with attachments
      await inquiryAPI.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: messageWithFiles,
        attachments: uploadedAttachments,
        timeline: formData.timeline,
        isQuote: true,
      });

      setSuccess(true);
      setFormData({ 
        name: '', email: '', phone: '', service: '', 
        timeline: 'standard', message: '' 
      });
      setFiles([]);
      setUploadProgress(0);
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
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✓ Free Consultation &nbsp; ✓ 24hr Response &nbsp; ✓ Confidential
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get a Free Quote</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Upload your drawings and get a free, no-obligation quote within 24 hours.
          </p>
        </div>
      </div>

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
                    <p className="text-green-700 text-sm">
                      Thank you! We'll review your drawings and get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start">
                  <span className="text-2xl mr-3">⚠️</span>
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

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Drawings{' '}
                    <span className="text-gray-400 font-normal">
                      (PDF, DWG, DXF, IFC, images — max {MAX_FILES} files, 10MB each)
                    </span>
                  </label>
                  
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all">
                    <span className="text-4xl mb-2">📤</span>
                    <span className="font-medium text-gray-700">Click to upload or drag & drop</span>
                    <span className="text-xs text-gray-500 mt-1">Your files are kept 100% confidential</span>
                    <input
                      type="file" multiple
                      accept=".pdf,.dwg,.dxf,.ifc,.png,.jpg,.jpeg,.zip"
                      onChange={handleFiles} className="hidden"
                    />
                  </label>

                  {/* Uploaded files list */}
                  {files.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {files.map((file, i) => (
                        <li key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                          <div className="flex items-center min-w-0 flex-1">
                            <span className="text-2xl mr-3">{getFileIcon(file.name)}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="ml-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {files.length >= MAX_FILES && (
                    <p className="text-xs text-orange-600 mt-2">
                      Maximum {MAX_FILES} files allowed. Remove a file to add another.
                    </p>
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

                {/* Upload progress */}
                {uploading && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-blue-800">Uploading drawings...</p>
                      <p className="text-sm text-blue-600">{uploadProgress}%</p>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  type="submit" disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading
                    ? `Uploading drawings... (${uploadProgress}%)`
                    : loading
                    ? 'Sending...'
                    : 'Upload Drawings & Get a Quote →'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  🔒 Your drawings and project data are always protected.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-lg mb-4">Why CivilPro?</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span> Accuracy guaranteed — double-checked by senior engineers
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span> Fast turnaround — most projects in 1-5 business days
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💰</span> Competitive pricing — starting from $300, no hidden fees
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🔒</span> 100% confidential — strict NDA on every project
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Prefer to talk?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Reach out directly and we'll help you get started.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
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