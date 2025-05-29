"use client";

import Image from 'next/image';
import { MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function AboutSection() {
  const { locale, t, changeLanguage } = useLanguage();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      changeLanguage(savedLocale as 'en' | 'el');  
    }
  }, [changeLanguage]);

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('about.title')}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t('about.paragraph1')}
            </p>
            <p className="mt-4 text-muted-foreground">
              {t('about.paragraph2')}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>{t('about.place')}</span>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/assets/test.jpg"
              alt="Olympiada Village View"
              fill
              className="object-cover border-[5px] rounded-lg border-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
}