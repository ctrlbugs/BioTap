'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectUserRegion, LANG_TO_FLAG } from '@/app/lib/regionConfig';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  regionFlag: string;
  setRegionFlag: (flag: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGS = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'pt', 'ru', 'ja'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('en');
  const [regionFlag, setRegionFlagState] = useState<string>('🇳🇬');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      setLanguageState(savedLang);
      setRegionFlagState(LANG_TO_FLAG[savedLang] ?? '🇳🇬');
      return;
    }
    // No saved preference: detect region, set flag, and auto-translate for non-English regions
    detectUserRegion().then((region) => {
      setRegionFlagState(region.flag);
      if (SUPPORTED_LANGS.includes(region.langCode)) {
        setLanguageState(region.langCode);
        localStorage.setItem('selectedLanguage', region.langCode);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLanguageChange = (e: CustomEvent) => {
        setLanguageState(e.detail);
      };

      window.addEventListener('languageChange', handleLanguageChange as EventListener);
      return () => {
        window.removeEventListener('languageChange', handleLanguageChange as EventListener);
      };
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang);
      window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
    }
  };

  const t = (key: string): string => {
    const { getTranslation } = require('@/app/lib/translations');
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, regionFlag, setRegionFlag: setRegionFlagState, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

