"use client";

import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { translations, TranslationsType, LocaleType } from './translations';

type LanguageContextType = {
  locale: LocaleType;
  t: (key: string, fallback?: string, variables?: Record<string, any>) => any;
  changeLanguage: (locale: LocaleType) => void;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: () => '', // Default still returns string, but type allows more
  changeLanguage: () => {},
  isLoading: true,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<LocaleType>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved language preference
    const savedLocale = localStorage.getItem('locale') as LocaleType;
    if (savedLocale && ['en', 'el'].includes(savedLocale)) {
      setLocale(savedLocale);
    }
    setIsLoading(false);
  }, []);

  const t = useCallback((key: string, fallback?: string, variables?: Record<string, any>) => {
    try {
      const keys = key.split('.');
      let value: any = translations[locale];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          throw new Error(`Translation key not found: ${key}`);
        }
      }

      // Handle variable substitution
      if (typeof value === 'string' && variables) {
        return value.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
          return variables[varName] || match;
        });
      }

      return value;
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`, error);
      return fallback || key.split('.').pop() || key;
    }
  }, [locale]);

  const changeLanguage = useCallback((newLocale: LocaleType) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);