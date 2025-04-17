"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// Removed Link import as it's not used directly for navigation here
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
// Removed fs import as it's not used
import { useLanguage } from "@/context/LanguageContext";


// Define the accommodation type
type Accommodation = {
  id: string; // Added ID for translation key lookup
  title: string;
  // description: string; // Description will come from translations
  image: string;
  price: string;
  // amenities: string[]; // Amenities will come from translations
  link: string;
};

export default function AccommodationsSection() {
  const [showMoreAccommodations, setShowMoreAccommodations] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
    const { locale, t, changeLanguage } = useLanguage();

    useEffect(() => {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
        changeLanguage(savedLocale as 'en' | 'el');
      }
    }, [changeLanguage]);

  // Define all accommodations data (without translatable text)
  const accommodationsData: Accommodation[] = [
    {
      id: "liotopi",
      title: "Liotopi",
      image: "/assets/accommodations/liotopi/primer.jpg",
      price: "146€",
      link: "https://www.booking.com/hotel/gr/liotopi.en-gb.html"
    },
    {
      id: "evelyn",
      title: "Evelyn Rooms",
      image: "/assets/accommodations/evelyn/primer.jpg",
      price: "77€",
      link: "https://www.booking.com/hotel/gr/evelyn-studios.en-gb.html"
    },
    {
      id: "yanna",
      title: "Villa Yanna",
      image: "/assets/accommodations/yanna/primer.jpg",
      price: "62€",
      link: "https://www.booking.com/hotel/gr/villa-yanna.en-gb.html"
    },
    {
      id: "alpe",
      title: "Alpe Luxury",
      image: "/assets/accommodations/alpe/primer.jpg",
      price: "172€",
      link: "https://www.booking.com/hotel/gr/alpe-luxury-accommodation-penelope-collection.en-gb.html"
    },
    {
      id: "dimar",
      title: "Dimar Apartments",
      image: "/assets/accommodations/dimar/primer.jpg",
      price: "73€",
      link: "https://www.booking.com/hotel/gr/dimar-apartments.en-gb.html" // Assuming no link for this one
    },
    {
      id: "aristoteliagi",
      title: "Aristotelia Gi - Panorama",
      image: "/assets/accommodations/aristoteliagi/primer.jpg",
      price: "122€",
      link: "https://www.booking.com/hotel/gr/aristotelia-gi-panorama.en-gb.html" // Assuming no link for this one
    },
  ];

  // Initial accommodations to show
  const initialAccommodations = accommodationsData.slice(0, 3);
  // Additional accommodations to show when "View More" is clicked
  const additionalAccommodations = accommodationsData.slice(3, 6);

  // Function to handle opening details
  const openAccommodationDetails = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  // Helper function to render an accommodation card
  const renderAccommodationCard = (accommodation: Accommodation, key: string) => (
    <div key={key} className="rounded-lg border bg-white overflow-hidden flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={accommodation.image}
          alt={accommodation.title} // Alt text remains the title
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop for optimization
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold">{accommodation.title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">
          {t(`stay.accommodations.${accommodation.id}.description`)}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold">{t('stay.pricePrefix')} {accommodation.price} {t('stay.priceSuffix')}</p>
          <div className="flex gap-2">
          <Button
              variant="outline"
              onClick={() => openAccommodationDetails(accommodation)}
            >
              {t('stay.detailsButton')}
            </Button>
            {accommodation.link && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" variant="default" asChild>
                {/* Use asChild to make the Button render an anchor tag */}
                <a href={accommodation.link} target="_blank" rel="noopener noreferrer">
                  {t('stay.bookNowButton')}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="accommodations" className="bg-slate-50 py-16 md:py-24 w-full">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Calendar className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('stay.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('stay.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Initial accommodations */}
          {initialAccommodations.map((acc, index) => renderAccommodationCard(acc, `initial-acc-${index}`))}
        </div>

        {/* Additional accommodations when "View More" is clicked */}
        {showMoreAccommodations && (
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            {additionalAccommodations.map((acc, index) => renderAccommodationCard(acc, `additional-acc-${index}`))}
          </div>
        )}

        {/* View More button */}
        {accommodationsData.length > 3 && ( // Only show button if there are more accommodations
            <div className="mt-8 text-center">
            <Button
                onClick={() => setShowMoreAccommodations(!showMoreAccommodations)}
                variant="outline"
                className="mx-auto"
            >
                {showMoreAccommodations ? t('stay.showLessButton') : t('stay.viewMoreButton')}
            </Button>
            </div>
        )}
      </div>

      {/* Accommodation Details Dialog */}
      <Dialog open={!!selectedAccommodation} onOpenChange={(open) => !open && setSelectedAccommodation(null)}>
        {selectedAccommodation && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedAccommodation.title}</DialogTitle>
              <DialogDescription>
                {t(`stay.accommodations.${selectedAccommodation.id}.description`)}
              </DialogDescription>
            </DialogHeader>

            <div className="relative h-64 w-full my-4">
              <Image
                src={selectedAccommodation.image}
                alt={selectedAccommodation.title}
                fill
                sizes="(max-width: 640px) 90vw, 600px" // Adjusted sizes for dialog
                className="object-cover rounded-md"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg">{t('stay.dialog.startingFrom')}</h4>
                <p className="text-xl font-bold">{selectedAccommodation.price} {t('stay.priceSuffix')}</p>
              </div>

              <div>
                <h4 className="font-medium text-lg">{t('stay.dialog.amenities')}</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(t(`stay.accommodations.${selectedAccommodation.id}.amenities`) as string[]).map((amenity: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAccommodation(null)}>{t('stay.dialog.closeButton')}</Button>
              {selectedAccommodation.link && (
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <a href={selectedAccommodation.link} target="_blank" rel="noopener noreferrer">
                    {t('stay.bookNowButton')}
                  </a>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}