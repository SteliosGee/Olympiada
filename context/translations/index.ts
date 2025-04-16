import { en } from './en';
import { el } from './el';

export const translations = {
  en,
  el
};

// Define the type for translations for better TypeScript support
export type TranslationsType = typeof translations;
export type LocaleType = keyof TranslationsType;
export type TranslationKeys = keyof TranslationsType['en'];