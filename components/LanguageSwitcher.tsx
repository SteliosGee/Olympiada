"use client";

import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { locale, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage(locale === 'en' ? 'el' : 'en')}
        className="px-2 py-1 text-sm"
      >
        {locale === 'en' ? 'Ελληνικά' : 'English'}
      </Button>
    </div>
  );
}