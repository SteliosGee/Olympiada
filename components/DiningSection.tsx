import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Utensils } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translation";
import { MenuModal } from "./RestaurantCard";

export default function DiningSection() {
  const { locale, changeLanguage } = useLanguage() as { locale: 'en' | 'el'; changeLanguage: (lang: 'en' | 'el') => void };
  const [selectedMenu, setSelectedMenu] = useState<"Perroquet" | "Molos" | "Akroyali" | null>(null);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
      changeLanguage(savedLocale as 'en' | 'el');
    }
  }, [changeLanguage]);

  // Get restaurant names from translations
  const places = Object.keys(translations[locale].places.restaurants);

  return (
    <section id="dining" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <Utensils className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations[locale].places.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {translations[locale].places.description}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => {
            const restaurantData = translations[locale].places.restaurants[place as keyof typeof translations["en"]["places"]["restaurants"]];
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
                    {restaurantData.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-muted-foreground">
                      ({restaurantData.reviews} {translations[locale].common.reviews})
                    </span>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedMenu(place as "Perroquet" | "Molos" | "Akroyali")}
                    >
                      {translations[locale].places.viewMenu}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="#dining">{translations[locale].places.viewAll}</Link>
          </Button>
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