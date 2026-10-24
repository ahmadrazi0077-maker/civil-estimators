import { useRouter } from 'next/router';
import en from '../locales/en';
import ar from '../locales/ar';
import es from '../locales/es';

export const LOCALES = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'عربي', dir: 'rtl' },
  { code: 'es', label: 'Español', short: 'ES', dir: 'ltr' },
];

export const dictionaries = { en, ar, es };

export function getDir(locale) {
  const found = LOCALES.find((l) => l.code === locale);
  return found ? found.dir : 'ltr';
}

export function getDict(locale) {
  return dictionaries[locale] || en;
}

function lookup(dict, path) {
  if (!dict || !path) return undefined;
  return path.split('.').reduce((acc, key) => {
    if (acc === undefined || acc === null) return undefined;
    // Support array indexes written as numeric segments, e.g. "home.faq.items.0.q"
    return acc[key];
  }, dict);
}

/**
 * Translate using a dot path, e.g. t('header.nav.home').
 * Falls back to the English dictionary, then to the key itself.
 * Values may be strings, arrays or objects — returned as-is.
 */
export function translate(locale, path) {
  const dict = getDict(locale);
  const value = lookup(dict, path);
  if (value !== undefined) return value;
  const enValue = lookup(en, path);
  if (enValue !== undefined) return enValue;
  return path;
}

export function useT() {
  const router = useRouter();
  const locale = router.locale || 'en';
  const t = (path) => translate(locale, path);
  return { t, locale, dir: getDir(locale) };
}

/**
 * Merge translated service fields (title, shortDescription, description,
 * features, timeline) over an API/fallback service when locale !== 'en'.
 * English rendering stays exactly as the API returns it.
 */
export function localizeService(service, locale) {
  if (!service || locale === 'en' || !locale) return service;
  const dict = getDict(locale);
  const overrides = dict && dict.servicesData ? dict.servicesData[service.slug] : null;
  if (!overrides) return service;
  return {
    ...service,
    title: overrides.title || service.title,
    shortDescription: overrides.shortDescription || service.shortDescription,
    description: overrides.description || service.description,
    features:
      Array.isArray(overrides.features) && overrides.features.length > 0
        ? overrides.features
        : service.features,
    timeline: overrides.timeline || service.timeline,
  };
}
