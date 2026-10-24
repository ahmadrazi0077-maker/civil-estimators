import Link from 'next/link';
import { useRouter } from 'next/router';
import { LOCALES } from '../lib/i18n';

export default function LanguageSwitcher({ className = '' }) {
  const router = useRouter();
  const current = router.locale || 'en';

  return (
    <div className={`flex items-center gap-1 bg-gray-100 rounded-full p-1 ${className}`} role="group" aria-label="Language">
      {LOCALES.map((l) => {
        const active = l.code === current;
        return (
          <Link
            key={l.code}
            href={{ pathname: router.pathname, query: router.query }}
            locale={l.code}
            hrefLang={l.code}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              active
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            {l.label === 'English' ? 'EN' : l.label}
          </Link>
        );
      })}
    </div>
  );
}
