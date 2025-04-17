import { en } from './en';
import { el } from './el';

export const translations = {
  en,
  el
};

// These types help TypeScript understand the structure
export type TranslationsType = typeof translations;
export type LocaleType = keyof TranslationsType;
export type TranslationKeys = keyof typeof en;