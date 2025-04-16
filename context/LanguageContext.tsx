"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, TranslationsType, LocaleType } from './translations';

type LanguageContextType = {
  locale: LocaleType;
  t: (key: string) => string;
  changeLanguage: (locale: LocaleType) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: () => '',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<LocaleType>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const changeLanguage = (newLocale: LocaleType) => {
    setLocale(newLocale);
    document.documentElement.lang = newLocale;
    localStorage.setItem('locale', newLocale);
  };

  // Initialize from localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as LocaleType;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      setLocale(savedLocale);
      document.documentElement.lang = savedLocale;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);