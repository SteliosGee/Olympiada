"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SailboatIcon as Boat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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

export default function ActivitiesSection() {
  const [showMoreActivities, setShowMoreActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Define all activities with detailed information
  const activities: Activity[] = [
    {
      title: "Water Sports",
      shortDescription: "Try paddleboarding, kayaking, canoeing and more",
      fullDescription: "Experience the thrill of various water sports in the crystal-clear waters of Olympiada. Our certified instructors provide equipment and guidance for all skill levels, from beginners to advanced enthusiasts.",
      image: "/assets/whatsupguys/primer.jpg",
      pricing: "Rentals from €15/hour, Lessons from €30/hour",
      details: [
        "Equipment rental available",
        "Professional instructors",
        "Suitable for all ages and skill levels",
        "Safety equipment provided",
        "Group discounts available"
      ],
      contactInfo: "Book at WhatSUpGuys Beach Center or call +30 23760 51987",
      location: "Main Beach, Olympiada"
    },
    {
      title: "Hiking & Nature Walks",
      shortDescription: "Explore scenic trails through olive groves and coastal paths",
      fullDescription: "Discover the natural beauty of Olympiada and its surroundings through our network of well-maintained hiking trails. From easy coastal walks to more challenging mountain paths, there's a route for everyone.",
      image: "/assets/hiking/primer.jpg",
      pricing: "Free self-guided routes, Guided tours from €20/person",
      details: [
        "Maps available at the tourist office",
        "Guided tours with local experts",
        "Various difficulty levels",
        "Rich biodiversity and stunning vistas",
        "Ancient ruins along several routes"
      ],
      contactInfo: "Inquire at Village Information Center or call +30 23760 51234",
      season: "Year-round (best in spring and autumn)",
      location: "Various trailheads around Olympiada"
    },
    {
      title: "Island Visit",
      shortDescription: "Hop on a boat and explore the nearby island \"Kafkanas\"",
      fullDescription: "Take a short boat trip to the uninhabited island of Kafkanas, where you can enjoy pristine beaches, snorkeling in secluded coves, and the tranquility of untouched nature.",
      image: "/assets/kafkanas/primer.jpg",
      pricing: "Round-trip boat ride: €25/adult, €15/child",
      details: [
        "Daily departures (weather permitting)",
        "Snorkeling equipment available for rent",
        "Packed lunch options",
        "Swimming in crystal clear waters",
        "Uninhabited island exploration"
      ],
      contactInfo: "Book at the harbor or call Captain Yannis at +30 694 523 7891",
      season: "June through September",
      location: "Departures from Olympiada Harbor"
    },
    {
      title: "Archaeological Tours",
      shortDescription: "Visit Ancient Stagira and other historical sites nearby",
      fullDescription: "Explore the birthplace of Aristotle and other significant archaeological sites around Olympiada. Learn about the rich history of the region from expert guides who bring the past to life.",
      image: "/assets/ancientstageira/primer.jpg",
      pricing: "Site entry: €4/person, Guided tours: €10/person",
      details: [
        "Birthplace of Aristotle",
        "Ancient city walls and temples",
        "Interactive historical presentations",
        "Archaeological museum nearby",
        "Combined tickets available for multiple sites"
      ],
      contactInfo: "Tours start at the Archaeological Museum or call +30 23760 51234",
      season: "Year-round",
      location: "2km from Olympiada village center"
    },
    {
      title: "Rental Boats",
      shortDescription: "Discover hidden coves and beaches along the coastline",
      fullDescription: "Rent a small motorboat (no license required) and become the captain of your own sea adventure. Explore the coastline at your own pace, discovering hidden beaches and coves accessible only by water.",
      image: "/assets/rentalboats/primer.jpg",
      pricing: "From €60 for half-day rental (fuel included)",
      details: [
        "No boating license required for small boats",
        "Safety equipment and instructions provided",
        "Fuel included in rental price",
        "Map of recommended spots provided",
        "Half-day and full-day options"
      ],
      contactInfo: "Available at Olympiada Marina or call +30 694 123 4567",
      season: "May through October",
      location: "Olympiada Marina"
    },
    {
      title: "Local Festivals",
      shortDescription: "Experience traditional Greek celebrations and music",
      fullDescription: "Immerse yourself in Greek culture by participating in local festivals and events. From the famous Sardine Festival in July to religious celebrations throughout the year, these authentic experiences offer a glimpse into Greek traditions.",
      image: "/assets/festival/primer.jpg",
      pricing: "Most events free to attend",
      details: [
        "Traditional Greek music and dance",
        "Local food and wine tastings",
        "Cultural demonstrations",
        "Religious processions",
        "Annual Sardine Festival in July"
      ],
      contactInfo: "Check event schedule at Village Information Center",
      season: "Various events throughout the year",
      location: "Village square and beach area"
    }
  ];

  return (
    <section id="activities" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Boat className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Summer Activities
          </h2>
          <p className="mt-4 text-muted-foreground">
            From relaxing on pristine beaches to exploring ancient ruins,
            Olympiada offers activities for everyone
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
                  Learn More
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
                  <h4 className="font-medium text-blue-600">Pricing</h4>
                  <p>{selectedActivity.pricing}</p>
                </div>
              )}
              
              {selectedActivity.details && selectedActivity.details.length > 0 && (
                <div>
                  <h4 className="font-medium text-blue-600">What to expect</h4>
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
                    <h4 className="font-medium text-blue-600">Best Season</h4>
                    <p className="text-sm">{selectedActivity.season}</p>
                  </div>
                )}
                
                {selectedActivity.location && (
                  <div>
                    <h4 className="font-medium text-blue-600">Location</h4>
                    <p className="text-sm">{selectedActivity.location}</p>
                  </div>
                )}
              </div>
              
              {selectedActivity.contactInfo && (
                <div className="pt-2">
                  <h4 className="font-medium text-blue-600">How to Book</h4>
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
                Close
              </Button>
              <Button 
                className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? "w-full" : ""}`}
              >
                Add to Itinerary
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}