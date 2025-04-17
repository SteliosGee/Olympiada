"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, TranslationsType, LocaleType } from './translations';

type LanguageContextType = {
  locale: LocaleType;
  t: (key: string) => any; // Changed return type from string to any
  changeLanguage: (locale: LocaleType) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: () => '', // Default still returns string, but type allows more
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<LocaleType>('en');

  // Adjust the function implementation return type and logic slightly
  const t = (key: string): any => { // Changed return type from string to any
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        // Return the key itself if not found
        // console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key;
      }
    }

    // Return the found value (could be string, array, object, etc.)
    return value;
  };

  const changeLanguage = (newLocale: LocaleType) => {
    setLocale(newLocale);
    // Ensure document object exists (client-side only)
    if (typeof window !== 'undefined') {
        document.documentElement.lang = newLocale;
        localStorage.setItem('locale', newLocale);
    }
  };

  // Initialize from localStorage on the client side
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