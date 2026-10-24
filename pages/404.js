import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { useT } from '../lib/i18n';

export default function Custom404() {
  const { t } = useT();

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">{t('pages.notFound.title')}</h2>
          <p className="text-gray-600 mb-8">
            {t('pages.notFound.text')}
          </p>
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('pages.notFound.goHome')}
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('pages.notFound.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
