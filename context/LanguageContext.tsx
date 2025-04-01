"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations } from './translation';

type LanguageContextType = {
  locale: string;
  t: (key: string) => string;
  changeLanguage: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: () => '',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    document.documentElement.lang = newLocale;
    localStorage.setItem('locale', newLocale);
  };

  // Initialize from localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
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
