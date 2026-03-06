/**
 * Maps country codes to language and flag for region-aware localization.
 * Nigeria is the default region. Non-English regions auto-translate.
 */

export interface RegionConfig {
  langCode: string;
  flag: string;
}

// Supported languages in translations: en, es, fr, de, zh, hi, pt, ru, ja
const COUNTRY_TO_REGION: Record<string, RegionConfig> = {
  // Nigeria - default
  NG: { langCode: 'en', flag: '🇳🇬' },
  // English-speaking
  US: { langCode: 'en', flag: '🇺🇸' },
  GB: { langCode: 'en', flag: '🇬🇧' },
  CA: { langCode: 'en', flag: '🇨🇦' },
  AU: { langCode: 'en', flag: '🇦🇺' },
  IE: { langCode: 'en', flag: '🇮🇪' },
  ZA: { langCode: 'en', flag: '🇿🇦' },
  GH: { langCode: 'en', flag: '🇬🇭' },
  KE: { langCode: 'en', flag: '🇰🇪' },
  // Spanish
  ES: { langCode: 'es', flag: '🇪🇸' },
  MX: { langCode: 'es', flag: '🇲🇽' },
  AR: { langCode: 'es', flag: '🇦🇷' },
  CO: { langCode: 'es', flag: '🇨🇴' },
  CL: { langCode: 'es', flag: '🇨🇱' },
  PE: { langCode: 'es', flag: '🇵🇪' },
  VE: { langCode: 'es', flag: '🇻🇪' },
  EC: { langCode: 'es', flag: '🇪🇨' },
  // French
  FR: { langCode: 'fr', flag: '🇫🇷' },
  BE: { langCode: 'fr', flag: '🇧🇪' },
  SN: { langCode: 'fr', flag: '🇸🇳' },
  CI: { langCode: 'fr', flag: '🇨🇮' },
  CM: { langCode: 'fr', flag: '🇨🇲' },
  // German
  DE: { langCode: 'de', flag: '🇩🇪' },
  AT: { langCode: 'de', flag: '🇦🇹' },
  CH: { langCode: 'de', flag: '🇨🇭' },
  // Chinese
  CN: { langCode: 'zh', flag: '🇨🇳' },
  TW: { langCode: 'zh', flag: '🇹🇼' },
  HK: { langCode: 'zh', flag: '🇭🇰' },
  SG: { langCode: 'zh', flag: '🇸🇬' },
  // Hindi
  IN: { langCode: 'hi', flag: '🇮🇳' },
  // Portuguese
  PT: { langCode: 'pt', flag: '🇵🇹' },
  BR: { langCode: 'pt', flag: '🇧🇷' },
  AO: { langCode: 'pt', flag: '🇦🇴' },
  MZ: { langCode: 'pt', flag: '🇲🇿' },
  // Russian
  RU: { langCode: 'ru', flag: '🇷🇺' },
  KZ: { langCode: 'ru', flag: '🇰🇿' },
  UA: { langCode: 'ru', flag: '🇺🇦' },
  BY: { langCode: 'ru', flag: '🇧🇾' },
  // Japanese
  JP: { langCode: 'ja', flag: '🇯🇵' },
};

const DEFAULT_REGION: RegionConfig = { langCode: 'en', flag: '🇳🇬' };

// Fallback flags when we have a saved language but no region detection
export const LANG_TO_FLAG: Record<string, string> = {
  en: '🇳🇬', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', zh: '🇨🇳', hi: '🇮🇳', pt: '🇵🇹', ru: '🇷🇺', ja: '🇯🇵',
};

export function getRegionByCountry(countryCode: string | null): RegionConfig {
  if (!countryCode) return DEFAULT_REGION;
  const upper = countryCode.toUpperCase();
  return COUNTRY_TO_REGION[upper] ?? DEFAULT_REGION;
}

export async function detectUserRegion(): Promise<RegionConfig> {
  if (typeof window === 'undefined') return DEFAULT_REGION;
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    const country = data?.country_code ?? null;
    return getRegionByCountry(country);
  } catch {
    // Fallback: try navigator.language (e.g. "en-NG", "es-ES")
    const locale = navigator.language || (navigator.languages?.[0]);
    if (locale) {
      const parts = locale.split('-');
      const country = parts[1]?.toUpperCase();
      if (country) return getRegionByCountry(country);
      // Language only: en, es, fr, etc.
      const lang = parts[0].toLowerCase();
      const match = Object.values(COUNTRY_TO_REGION).find((r) => r.langCode === lang);
      if (match) return match;
    }
    return DEFAULT_REGION;
  }
}
