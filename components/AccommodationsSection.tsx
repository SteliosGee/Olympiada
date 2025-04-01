"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { link } from "fs";

// Define the accommodation type
type Accommodation = {
  title: string;
  description: string;
  image: string;
  price: string;
  amenities: string[];
  link: string;
};

export default function AccommodationsSection() {
  const [showMoreAccommodations, setShowMoreAccommodations] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  
  // Define all accommodations
  const accommodations = [
    {
      title: "Liotopi",
      description: "Experience authentic Greek hospitality in our traditional stone guesthouse.",
      image: "/assets/accommodations/liotopi/primer.jpg",
      price: "146€",
      amenities: ["Free WiFi", "Breakfast included", "Beachfront", "Airport shuttle", "Room service", "Non-smoking rooms",
        "Restaurant", "Family rooms", "Bar"
      ],
      link: "https://www.booking.com/hotel/gr/liotopi.en-gb.html"
    },
    {
      title: "Evelyn Rooms",
      description: "Luxury villa with direct access to the beach and stunning sea views.",
      image: "/assets/accommodations/evelyn/primer.jpg",
      price: "77€",
      amenities: ["Free parking", "Free WiFi"],
      link: "https://www.booking.com/hotel/gr/evelyn-studios.en-gb.html"
    },
    {
      title: "Villa Yanna",
      description: "Comfortable apartment with all modern amenities in the center of Olympiada.",
      image: "/assets/accommodations/yanna/primer.jpg",
      price: "€62",
      amenities: ["Free parking", "Free WiFi", "Non-smoking rooms", "Room service"],
      link: "https://www.booking.com/hotel/gr/villa-yanna.en-gb.html"
    },
    {
      title: "Seaside Bungalow",
      description: "Cozy bungalow just steps from the shoreline with panoramic views.",
      image: "/assets/accommodations/bungalow.jpg",
      price: "€95",
      amenities: ["Beach access", "Kitchenette", "Terrace"],
      link: "https://www.booking.com/hotel/gr/seaside-bungalow.en-gb.html"
    },
    {
      title: "Family Suite",
      description: "Spacious suite perfect for families, with separate bedrooms and living area.",
      image: "/assets/accommodations/family.jpg",
      price: "€120",
      amenities: ["Two bedrooms", "Children's play area", "Large balcony"],
      link: ""
    },
    {
      title: "Budget Studio",
      description: "Affordable studio apartment with all the essentials for a comfortable stay.",
      image: "/assets/accommodations/studio.jpg",
      price: "€45",
      amenities: ["Kitchenette", "Free WiFi", "Air conditioning"],
      link: ""
    },
  ];

  // Initial accommodations to show
  const initialAccommodations = accommodations.slice(0, 3);
  // Additional accommodations to show when "View More" is clicked
  const additionalAccommodations = accommodations.slice(3, 6);
  
  // Function to handle opening details
  const openAccommodationDetails = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  return (
    <section id="accommodations" className="bg-slate-50 py-16 md:py-24 w-full">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Calendar className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Where to Stay
          </h2>
          <p className="mt-4 text-muted-foreground">
            From traditional guesthouses to beachfront villas, find your perfect accommodation
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Initial accommodations */}
{initialAccommodations.map((accommodation, index) => (
  <div key={`accommodation-${index}`} className="rounded-lg border bg-white overflow-hidden">
    <div className="relative h-48">
      <Image
        src={accommodation.image}
        alt={accommodation.title}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold">{accommodation.title}</h3>
      <p className="mt-2 text-muted-foreground">{accommodation.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-bold">From {accommodation.price} / night</p>
        <div className="flex gap-2">
        <Button 
            variant="outline"
            onClick={() => openAccommodationDetails(accommodation)}
          >
            Details
          </Button>
          {accommodation.link && (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" variant="default">
              <a href={accommodation.link} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          )}

        </div>
      </div>
    </div>
  </div>
))}
        </div>
        
        {/* Additional accommodations when "View More" is clicked */}
        {showMoreAccommodations && (
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            {additionalAccommodations.map((accommodation, index) => (
              <div key={`accommodation-${index + 3}`} className="rounded-lg border bg-white overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={accommodation.image}
                    alt={accommodation.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{accommodation.title}</h3>
                  <p className="mt-2 text-muted-foreground">{accommodation.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-bold">From {accommodation.price} / night</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => openAccommodationDetails(accommodation)}
                      >
                        Details
                      </Button>
                      {accommodation.link && (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" variant="default">
                          <a href={accommodation.link} target="_blank" rel="noopener noreferrer">
                            Book Now
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* View More button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => setShowMoreAccommodations(!showMoreAccommodations)}
            variant="outline"
            className="mx-auto"
          >
            {showMoreAccommodations ? "Show Less" : "View More Accommodations"}
          </Button>
        </div>
      </div>

      {/* Accommodation Details Dialog */}
      <Dialog open={!!selectedAccommodation} onOpenChange={(open) => !open && setSelectedAccommodation(null)}>
        {selectedAccommodation && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedAccommodation.title}</DialogTitle>
              <DialogDescription>
                {selectedAccommodation.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative h-64 w-full my-4">
              <Image
                src={selectedAccommodation.image}
                alt={selectedAccommodation.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg">Starting from</h4>
                <p className="text-xl font-bold">{selectedAccommodation.price} / night</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg">Amenities</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAccommodation.amenities.map((amenity, i) => (
                    <Badge key={i} variant="outline" className="text-sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setSelectedAccommodation(null)}>Close</Button>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                <a href={selectedAccommodation.link} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}