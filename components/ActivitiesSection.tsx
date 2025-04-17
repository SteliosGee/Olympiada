"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SailboatIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

// Define the Activity type (ensure this matches your translation structure)
type Activity = {
  // Add an optional id if your data might have one, useful for keys
  id?: string | number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  pricing?: string;
  details?: string[];
  contactInfo?: string;
  season?: string;
  location?: string;
};

export default function ActivitiesSection() {
  const { locale, t, changeLanguage } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Client-side check for localStorage
    if (typeof window !== 'undefined') {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
          changeLanguage(savedLocale as 'en' | 'el');
        }
    }
  }, [changeLanguage]);

  // Detect if user is on mobile (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const checkIfMobile = () => {
          setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile(); // Initial check
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile); // Cleanup
    }
  }, []);

  // Directly get activities using the t function.
  // Type assertion might be needed if 'any' isn't specific enough,
  // but '|| []' helps ensure it's at least an array.
  const activities: Activity[] = (t('activities.items') as Activity[]) || [];

  // Optional: Keep console log for debugging during development
  useEffect(() => {
    console.log(`Activities for locale '${locale}':`, activities);
    // You might still want a warning if it's not an array at runtime
    if (!Array.isArray(activities)) {
        console.warn(`Warning: t('activities.items') did not return an array for locale '${locale}'. Received:`, activities);
    }
  }, [locale, activities]);

  // Removed the explicit error block before return

  return (
    <section id="activities" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <SailboatIcon className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('activities.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('activities.description')}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Keep Array.isArray check here for runtime safety before mapping */}
          {Array.isArray(activities) && activities.map((activity, index) => (
            <div
              // Use a unique ID from the activity if available, otherwise fallback to index
              key={activity.id || index}
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setSelectedActivity(activity)}
            >
              <Image
                src={activity.image}
                alt={activity.title}
                width={600}
                height={400}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-xl font-bold">{activity.title}</h3>
                <p className="mt-2">
                  {activity.shortDescription}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/40 text-white"
                >
                  {t('activities.learnMore')}
                </Button>
              </div>
            </div>
          ))}
          {/* Optional: Render a message if activities is not an array */}
          {!Array.isArray(activities) && (
              <p className="col-span-full text-center text-muted-foreground">Loading activities or none available...</p>
          )}
        </div>
      </div>

      {/* Activity Details Dialog */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        {selectedActivity && (
          <DialogContent
            className={isMobile
              ? "sm:max-w-[90%] max-h-[85vh] overflow-y-auto"
              : "sm:max-w-[800px] md:max-w-[900px] max-h-[80vh] overflow-y-auto"}
          >
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">{selectedActivity.title}</DialogTitle>
              <DialogDescription>
                {selectedActivity.shortDescription}
              </DialogDescription>
            </DialogHeader>

            <div className={`relative ${isMobile ? "h-48" : "h-72"} w-full my-4`}>
              <Image
                src={selectedActivity.image}
                alt={selectedActivity.title}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">{selectedActivity.fullDescription}</p>
              </div>

              {selectedActivity.pricing && (
                <div>
                  <h4 className="font-medium text-blue-600">{t('activities.pricing')}</h4>
                  <p>{selectedActivity.pricing}</p>
                </div>
              )}

              {selectedActivity.details && selectedActivity.details.length > 0 && (
                <div>
                  <h4 className="font-medium text-blue-600">{t('activities.whatToExpect')}</h4>
                  <ul className="mt-2 space-y-1">
                    {selectedActivity.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}>
                {selectedActivity.season && (
                  <div>
                    <h4 className="font-medium text-blue-600">{t('activities.bestSeason')}</h4>
                    <p className="text-sm">{selectedActivity.season}</p>
                  </div>
                )}

                {selectedActivity.location && (
                  <div>
                    <h4 className="font-medium text-blue-600">{t('activities.location')}</h4>
                    <p className="text-sm">{selectedActivity.location}</p>
                  </div>
                )}
              </div>

              {selectedActivity.contactInfo && (
                <div className="pt-2">
                  <h4 className="font-medium text-blue-600">{t('activities.contact')}</h4>
                  <p className="text-sm">{selectedActivity.contactInfo}</p>
                </div>
              )}
            </div>

            <DialogFooter className={`${isMobile ? "flex-col gap-2" : "flex-row"} mt-4`}>
              <Button
                onClick={() => setSelectedActivity(null)}
                variant="outline"
                className={isMobile ? "w-full" : ""}
              >
                {t('activities.close') || t('common.close') || "Close"}
              </Button>
              <Button
                className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? "w-full" : ""}`}
              >
                {t('activities.addToItinerary')}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}