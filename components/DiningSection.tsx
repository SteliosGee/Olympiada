import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Utensils } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced menu data with categories
const menuData = {
  "Perroquet": {
    "Cocktails": [
      "Mojito - $8",
      "Pina Colada - $9",
      "Aperol Spritz - $10",
      "Negroni - $10",
    ],
    "Coffees": [
      "Espresso - $3",
      "Cappuccino - $4",
      "Freddo Espresso - $5",
      "Greek Coffee - $3.50",
    ],
    "Juices": [
      "Fresh Orange - $6",
      "Watermelon - $5",
      "Mixed Berries - $7",
    ],
    "Snacks": [
      "Greek Salad - $7",
      "Club Sandwich - $8",
      "Bruschetta - $6",
    ],
  },
  "Molos": {
    "Pizza": [
      "Margherita Pizza - $12",
      "Pepperoni - $14",
      "Greek Special - $15",
      "Seafood - $16",
    ],
    "Pasta": [
      "Spaghetti Carbonara - $14",
      "Penne Arrabiata - $12",
      "Seafood Linguine - $16",
    ],
    "Salads": [
      "Caesar Salad - $10",
      "Greek Salad - $9",
      "Rocket & Parmesan - $8",
    ],
    "Desserts": [
      "Tiramisu - $7",
      "Panna Cotta - $6",
      "Ice Cream - $5",
    ],
  },
  "Akroyali": {
    "Seafood": [
      "Grilled Octopus - $16",
      "Fried Calamari - $14",
      "Fresh Fish (daily catch) - $18",
      "Shrimp Saganaki - $15",
    ],
    "Main Dishes": [
      "Moussaka - $14",
      "Lamb Kleftiko - $16",
      "Souvlaki Plate - $13",
      "Beef Stifado - $15",
    ],
    "Appetizers": [
      "Tzatziki - $5",
      "Taramasalata - $5",
      "Dolmades - $7",
      "Grilled Halloumi - $8",
    ],
    "Desserts": [
      "Baklava - $6",
      "Galaktoboureko - $6",
      "Greek Yogurt with Honey - $5",
    ],
  },
};

function MenuModal({
  name,
  isOpen,
  onClose,
}: {
  name: keyof typeof menuData;
  isOpen: boolean;
  onClose: () => void;
}) {
  const categories = Object.keys(menuData[name]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {name}
          </DialogTitle>
          <div className="flex justify-center mt-2">
            <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
          </div>
        </DialogHeader>
        
        <div className="mt-6">
          <Tabs defaultValue={categories[0]} value={activeCategory} onValueChange={setActiveCategory}>
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full flex justify-between mb-4 min-w-[400px]">
                {categories.map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="flex-1 text-xs md:text-sm whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="px-1">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <h3 className="text-lg font-medium mb-4 text-blue-600 border-b pb-2">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {(menuData[name] as Record<string, string[]>)[category].map((item, index) => {
                      const [itemName, price] = item.split(' - ');
                      return (
                        <li key={index} className="flex items-center justify-between pb-2 border-b border-slate-200 last:border-0">
                          <span className="font-medium">{itemName}</span>
                          <span className="text-blue-600 font-semibold">{price}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>* Full menu available at the restaurant</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground italic">
            {name === "Perroquet" 
              ? "Known for amazing cocktails & sunsets" 
              : name === "Molos" 
              ? "Famous for authentic Italian cuisine"
              : "Best seafood in Olympiada"}
          </p>
          <DialogClose asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={onClose}
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DiningSection() {
  const [selectedMenu, setSelectedMenu] = useState<
    null | keyof typeof menuData
  >(null);

  const places = [
    "Perroquet",
    "Molos",
    "Akroyali",
  ] as const;

  return (
    <section id="dining" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <Utensils className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Beach Bars & Restaurants
          </h2>
          <p className="mt-4 text-muted-foreground">
            Savor authentic Greek cuisine and refreshing drinks with stunning
            sea views
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <div key={place} className="rounded-lg border bg-card shadow-sm">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={`/assets/dining/${place.toLowerCase()}/primer.jpg`}
                  alt={place}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{place}</h3>
                <p className="mt-2 text-muted-foreground">
                  {place === "Perroquet"
                    ? "Cozy beach bar with a relaxed atmosphere and delicious cocktails"
                    : place === "Molos"
                    ? "Trendy pizza and pasta restaurant with a vibrant atmosphere"
                    : "Traditional Greek taverna serving fresh seafood and local specialties"}
                </p>
                <div className="mt-4 flex items-center gap-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm text-muted-foreground">
                    (
                    {place === "Perroquet"
                      ? "425"
                      : place === "Molos"
                      ? "80"
                      : "380"}{" "}
                    reviews)
                  </span>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedMenu(place)}
                  >
                    View Menu
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="#dining">View All Dining Options</Link>
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
