import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { inquiryAPI, uploadAPI } from '../lib/api';
import PageHero from '../components/PageHero';
import HERO_IMAGES from '../lib/heroImages';
import { useT } from '../lib/i18n';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SERVICE_SLUGS = [
  'steel-detailing',
  'rebar-detailing',
  'quantity-takeoff',
  'cost-estimation',
  'boq-preparation',
  'shop-drawings',
];
const STEP_ICONS = ['📤', '💬', '✅', '📦'];

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
  const { t } = useT();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    const valid = [];
    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE) {
        setError(t('pages.quote.fileTooBig').replace('{name}', file.name));
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
            // Backend/admin message stays English
            fileLinks.push(`${file.name} (upload failed - will be requested by email)`);
          }
        }
        setUploading(false);
      }

      // Backend/admin message stays English
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
      setError(err.message || t('pages.quote.submitError'));
    } finally {
      setLoading(false);
    }
  };

  const steps = t('pages.quote.steps').map((s, i) => ({ ...s, icon: STEP_ICONS[i] }));
  const sidebarPoints = t('pages.quote.sidebarPoints');
  const sidebarIcons = t('pages.quote.sidebarIcons');

  return (
    <Layout>
      {/* Hero */}
      <PageHero
        image={HERO_IMAGES.quote}
        badge={t('pages.quote.badge')}
        title={t('pages.quote.heroTitle')}
        subtitle={t('pages.quote.heroSubtitle')}
        crumb={t('pages.quote.crumb')}
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
              <h2 className="text-2xl font-bold mb-6">{t('pages.quote.formTitle')}</h2>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <p className="font-semibold text-green-800">{t('pages.quote.successTitle')}</p>
                    <p className="text-green-700 text-sm">{t('pages.quote.successText')}</p>
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
                      {t('forms.fullName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder={t('pages.quote.namePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" name="email" required value={formData.email} onChange={handleChange}
                      placeholder={t('pages.quote.emailPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('forms.phone')}</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder={t('pages.quote.phonePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms.serviceRequired')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service" required value={formData.service} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="">{t('forms.selectService')}</option>
                      {SERVICE_SLUGS.map((slug) => (
                        <option key={slug} value={slug}>{t(`servicesData.${slug}.title`)}</option>
                      ))}
                      <option value="other">{t('common.other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.quote.timeline')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'standard', label: t('pages.quote.standard'), desc: t('pages.quote.standardDesc') },
                      { value: 'rush', label: t('pages.quote.rush'), desc: t('pages.quote.rushDesc') },
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
                    {t('pages.quote.uploadLabel')} <span className="text-gray-400 font-normal">{t('pages.quote.uploadHint')}</span>
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all">
                    <span className="text-4xl mb-2">📤</span>
                    <span className="font-medium text-gray-700">{t('pages.quote.uploadClick')}</span>
                    <span className="text-xs text-gray-500 mt-1">{t('pages.quote.uploadConfidential')}</span>
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
                    {t('pages.quote.projectDetails')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message" required rows="5" value={formData.message} onChange={handleChange}
                    placeholder={t('pages.quote.projectDetailsPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? t('pages.quote.uploading') : loading ? t('pages.quote.sending') : t('pages.quote.submitBtn')}
                </button>
                <p className="text-xs text-gray-500 text-center">{t('pages.quote.privacyNote')}</p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-lg mb-4">{t('pages.quote.sidebarTitle')}</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  {sidebarPoints.map((point, i) => (
                    <li key={i} className="flex items-start"><span className="mr-2">{sidebarIcons[i]}</span> {point}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">{t('pages.quote.talkTitle')}</h3>
                <p className="text-blue-100 text-sm mb-4">{t('pages.quote.talkText')}</p>
                <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                  {t('pages.quote.talkBtn')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
