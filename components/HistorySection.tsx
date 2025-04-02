"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// History section content type
type HistoricalPeriod = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  facts: string[]; // Array of strings representing historical facts
};

type PeriodKey = keyof typeof translations["en"]["history"]["periods"];

export default function HistorySection() {
  const { locale, changeLanguage } = useLanguage() as { locale: 'en' | 'el'; changeLanguage: (lang: 'en' | 'el') => void };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      changeLanguage(savedLocale as 'en' | 'el');
    }
  }, [changeLanguage]);

  // Effect for mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Convert the translations periods object to an array for rendering
  const historicalPeriods = Object.keys(translations[locale].history.periods || {})
    .map(key => translations[locale].history.periods[key as PeriodKey]);

  return (
    <section id="history" className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <History className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations[locale].history.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {translations[locale].history.description}
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">{translations[locale].history.block1_title}</h3>
            <p className="mt-2 text-muted-foreground">
              {translations[locale].history.block1_text}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">{translations[locale].history.block2_title}</h3>
            <p className="mt-2 text-muted-foreground">
              {translations[locale].history.block2_text}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">{translations[locale].history.block3_title}</h3>
            <p className="mt-2 text-muted-foreground">
              {translations[locale].history.block3_text}
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            {translations[locale].history.button}
          </Button>
        </div>
      </div>

      {/* History Detailed Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{translations[locale].history.title}</DialogTitle>
            <DialogDescription>
              {translations[locale].history.description}
            </DialogDescription>
          </DialogHeader>

          <div className="my-6">
            <Accordion type="single" collapsible className="w-full">
              {historicalPeriods.map((period, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium py-4">
                    <div className="w-full text-left flex flex-col sm:flex-row sm:items-baseline">
                      <span className="sm:w-40 font-medium flex-shrink-0">
                        {period.title}
                      </span>
                      <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                        {period.shortDescription}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="relative h-52 w-full">
                        <Image
                          src={period.image}
                          alt={period.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <p>{period.fullDescription}</p>
                      
                      {period.facts && period.facts.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium">{translations[locale].history.keyFacts}</h4>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {period.facts.map((fact: string, factIndex: number) => (
                              <li key={factIndex}>{fact}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>
              {translations[locale].common?.close || "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}