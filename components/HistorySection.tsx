"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
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
import { ChevronDown, ChevronUp } from "lucide-react";

// Define type for historical period
type HistoricalPeriod = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  facts: string[];
};

// Define type for timeline event
type TimelineEvent = {
  year: string;
  description: string;
  position: "left" | "right";
};

export default function HistorySection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Add state to track section open/closed state
  const [openSections, setOpenSections] = useState<{ timeline: boolean }>({
    timeline: false,
  });

  const { locale, t, changeLanguage } = useLanguage();

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

  // Get the historical periods from translations
  const periods = t('history.periods');
  const historicalPeriods = periods ? 
    Object.keys(periods).map(key => periods[key as keyof typeof periods]) as HistoricalPeriod[] : 
    [];

  return (
    <section id="history" className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <History className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("history.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("history.description")}
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">{t("history.block1_title")}</h3>
            <p className="mt-2 text-muted-foreground">
              {t('history.block1_text')}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">{t("history.block2_title")}</h3>
            <p className="mt-2 text-muted-foreground">
              {t("history.block2_text")}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">{t("history.block3_title")}</h3>
            <p className="mt-2 text-muted-foreground">
              {t("history.block3_text")}
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            {t("history.button")}
          </Button>
        </div>
      </div>

      {/* History Detailed Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t("history.title")}</DialogTitle>
            <DialogDescription>
              {t("history.description")}
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
                          <h4 className="font-medium">{t("history.keyFacts")}</h4>
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

          <div className="mt-6 border-t pt-6">
            <div className="rounded-md border overflow-hidden">
              <button
                onClick={() =>
                  setOpenSections({
                    ...openSections,
                    timeline: !openSections.timeline,
                  })
                }
                className="w-full p-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100"
              >
                <h3 className="text-lg font-medium">{t("history.timeline.title")}</h3>
                {openSections.timeline ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0" />
                )}
              </button>

              {openSections.timeline && (
                <div className="p-4 border-t">
                  <div className="space-y-8 relative">
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-blue-200 transform md:translate-x-[-1px]"></div>

                    {t("history.timeline.events").map((event: TimelineEvent, index: number) => (
                      <div key={index} className="flex flex-col md:flex-row">
                        {event.position === "left" ? (
                          <>
                            <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                              <div className="font-bold">{event.year}</div>
                              <p className="text-sm text-muted-foreground">
                                {event.description}
                              </p>
                            </div>
                            <div className="md:w-1/2 md:pl-8 relative">
                              <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
                            <div className="md:w-1/2 md:pl-8 relative">
                              <div className="absolute left-[-9px] md:left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-600 shadow"></div>
                              <div className="font-bold">{event.year}</div>
                              <p className="text-sm text-muted-foreground">
                                {event.description}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>
              {t("common.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}