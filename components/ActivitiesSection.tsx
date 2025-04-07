"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SailboatIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translation";

// Define the Activity type
type Activity = {
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

type ActivityKey = keyof typeof translations["en"]["activities"]["items"];

export default function ActivitiesSection() {
  const { locale, changeLanguage } = useLanguage() as { locale: 'en' | 'el'; changeLanguage: (lang: 'en' | 'el') => void };
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      changeLanguage(savedLocale as 'en' | 'el');
    }
  }, [changeLanguage]);

  // Detect if user is on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Convert the translations activities items object to an array for rendering
  const activities: Activity[] = Object.keys(translations[locale].activities.items || {})
    .map(key => translations[locale].activities.items[key as ActivityKey] as Activity);

  return (
    <section id="activities" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <SailboatIcon className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations[locale].activities.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {translations[locale].activities.description}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <div 
              key={index} 
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
                  {translations[locale].activities.learnMore}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Details Dialog - Responsive width based on device */}
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
                  <h4 className="font-medium text-blue-600">{translations[locale].activities.pricing}</h4>
                  <p>{selectedActivity.pricing}</p>
                </div>
              )}
              
              {selectedActivity.details && selectedActivity.details.length > 0 && (
                <div>
                  <h4 className="font-medium text-blue-600">{translations[locale].activities.whatToExpect}</h4>
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
                    <h4 className="font-medium text-blue-600">{translations[locale].activities.bestSeason}</h4>
                    <p className="text-sm">{selectedActivity.season}</p>
                  </div>
                )}
                
                {selectedActivity.location && (
                  <div>
                    <h4 className="font-medium text-blue-600">{translations[locale].activities.location}</h4>
                    <p className="text-sm">{selectedActivity.location}</p>
                  </div>
                )}
              </div>
              
              {selectedActivity.contactInfo && (
                <div className="pt-2">
                  <h4 className="font-medium text-blue-600">{translations[locale].activities.howToBook}</h4>
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
                {translations[locale].activities.close || translations[locale].common?.close || "Close"}
              </Button>
              <Button 
                className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? "w-full" : ""}`}
              >
                {translations[locale].activities.addToItinerary}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}