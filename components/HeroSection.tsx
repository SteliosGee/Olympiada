"use client";

import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { locale, t, changeLanguage } = useLanguage();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      changeLanguage(savedLocale as 'en' | 'el');  
    }
  }, [changeLanguage]);

  return (
            <section className="relative w-full h-[80vh]">
              <Image
                src="/assets/banner.jpg"
                alt="Olympiada Village"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex h-full flex-col items-center justify-center text-center text-white px-4 sm:px-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-[90%] sm:max-w-3xl">
                  {t('hero.title')}
                </h1>
                <p className="mt-4 max-w-xs sm:max-w-sm md:max-w-2xl text-base sm:text-lg">
                  {t('hero.subtitle')}
                </p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  >
                    <Link href="#accommodations">{t('hero.bookStay')}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto"
                  >
                    <Link href="#about">{t('hero.explore')}</Link>
                  </Button>
                </div>
              </div>
            </section>
  )
}