"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Anchor,
  MapPin,
  Menu,
  Mail
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HistorySection from "@/components/HistorySection";
import DiningSection from "@/components/DiningSection";
import OlympiadaMap from "@/components/Map";
import AccommodationsSection from  "@/components/AccommodationsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import CalendarSection from "@/components/CalendarSection";
import GallerySection from "@/components/GallerySection";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";


export default function Home() {
  const { locale, t, changeLanguage } = useLanguage();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      changeLanguage(savedLocale as 'en' | 'el');  
    }
  }, [changeLanguage]);


  

  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Lightbox */}


<header className="sticky top-0 z-50 bg-white shadow-sm w-full bg-opacity-80">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Anchor className="h-6 w-6" />
            <span>{t('navigation.olympiada')}</span>
          </Link>
          
          <nav className="hidden md:flex gap-4">
            <Link
              href="#about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.about')}
            </Link>
            <Link
              href="#history"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.history')}
            </Link>
            <Link
              href="#activities"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.activities')}
            </Link>
            <Link
              href="#accommodations"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.stay')}
            </Link>
            <Link
              href="#dining"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.dining')}
            </Link>
            <Link
              href="#map"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.map')}
            </Link>
            <Link
              href="#events"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.events')}
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {t('navigation.gallery')}
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75%] sm:w-[350px]">
                <div className="flex flex-col gap-6 pt-10">
                  <Link
                    href="#about"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                    onClick={() =>
                      document
                        .querySelector('[data-state="open"]')
                        ?.dispatchEvent(new Event("close", { bubbles: true }))
                    }
                  >
                    {t('navigation.about')}
                  </Link>
                  {/* Repeat for other navigation items */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />



        {/* History Section */}
        <HistorySection />

        {/* Activities Section */}
        <ActivitiesSection />

        {/* Map Section */}

        {/* Accommodations Section */}
        <AccommodationsSection/>

        {/* Dining Section */}
        <DiningSection />

        {/* Map Section */}
        <OlympiadaMap />

        {/* Calendar Section */}
        <CalendarSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white md:py-24">
          <div className="container text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('footer.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              {t('footer.description')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Link href="#accommodations">{t('footer.bookAccommodation')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50 py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">
                Made by {t('footer.author')}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="mailto:stelios.galegalidis@gmail.com" target="_blank" className="inline-flex items-center justify-center" aria-label="Email">
                <Mail className="h-5 w-5 text-blue-600 hover:text-blue-800" />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" className="inline-flex items-center justify-center" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-blue-600 hover:text-blue-800" style={{ verticalAlign: 'middle' }} />
              </Link>
              <Link href="https://www.facebook.com" target="_blank" className="inline-flex items-center justify-center" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5 text-blue-600 hover:text-blue-800" style={{ verticalAlign: 'middle' }} />
              </Link>
              <Link href="https://github.com" target="_blank" className="inline-flex items-center justify-center" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} className="h-5 w-5 text-blue-600 hover:text-blue-800" style={{ verticalAlign: 'middle' }} />
              </Link>
            </div>
          </div>
          <div className="my-4 border-t border-slate-200 w-full"></div>
          <div className="mt-4 text-sm text-slate-500 text-center">
            <p>
              &copy; {new Date().getFullYear()} Olympiada. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
