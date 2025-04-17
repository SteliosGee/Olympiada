import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Utensils } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MenuModal } from "./RestaurantCard";

export default function DiningSection() {
  const { locale, t, changeLanguage } = useLanguage();
  const [selectedMenu, setSelectedMenu] = useState<"Perroquet" | "Molos" | "Akroyali" | "Apoplous" | null>(null);
  const [showMorePlaces, setShowMorePlaces] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      changeLanguage(savedLocale as 'en' | 'el');
    }
  }, [changeLanguage]);

  // Get restaurant names - we need to handle this differently since we need to access keys
  // This assumes your t() function can return the nested places.restaurants object
  const restaurantsObj = t('places.restaurants');
  const allPlaces = restaurantsObj && typeof restaurantsObj === 'object' 
    ? Object.keys(restaurantsObj) 
    : [];
  
  // Split places into initial and additional sets
  const initialPlaces = allPlaces.slice(0, 3);
  const additionalPlaces = allPlaces.slice(3);

  // Function to render restaurant card
  const renderRestaurantCard = (place: string) => {
    // Access the specific restaurant data via the t() function with full path
    const restaurantPath = `places.restaurants.${place}`;
    const description = t(`${restaurantPath}.description`);
    const reviews = t(`${restaurantPath}.reviews`);
    
    // Default rating is 5, but you can customize per restaurant
    const rating = place === "Apoplous" ? 4 : 5;
    
    return (
      <div key={place} className="rounded-lg border bg-card shadow-sm flex flex-col h-full">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={`/assets/dining/${place.toLowerCase()}/primer.jpg`}
            alt={place}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold">{place}</h3>
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
          <div className="mt-4 flex items-center gap-1">
            <div className="flex" aria-label={`${rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i}
                  className={`text-yellow-500 ${i >= rating ? "opacity-30" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviews} {t('common.reviews')})
            </span>
          </div>
          <div className="mt-auto pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSelectedMenu(place as typeof selectedMenu)}
            >
              {t('places.viewMenu')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="dining" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <Utensils className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('places.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('places.description')}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {initialPlaces.map(renderRestaurantCard)}
        </div>
        
        {/* Additional places shown when View More is clicked */}
        {showMorePlaces && additionalPlaces.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {additionalPlaces.map(renderRestaurantCard)}
          </div>
        )}
        
        <div className="mt-8 text-center flex justify-center gap-4">
          {additionalPlaces.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setShowMorePlaces(!showMorePlaces)}
            >
              {showMorePlaces ? 
                (locale === 'en' ? "Show Less" : "Προβολή Λιγότερων") : 
                (locale === 'en' ? "View More" : "Προβολή Περισσότερων")
              }
            </Button>
          )}
        </div>
      </div>
      {selectedMenu && (
        <MenuModal
          name={selectedMenu}
          isOpen={!!selectedMenu}
          onClose={() => setSelectedMenu(null)}
        />
      )}
    </section>
  );
}