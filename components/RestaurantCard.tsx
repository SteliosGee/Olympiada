import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translation";

export function MenuModal({
    name,
    isOpen,
    onClose,
  }: {
    name: keyof typeof translations["en"]["places"]["restaurants"];
    isOpen: boolean;
    onClose: () => void;
  }) {
    const { locale } = useLanguage() as { locale: 'en' | 'el' };
    const restaurantData = translations[locale].places.restaurants[name];
    
    if (!restaurantData) return null;
    
    const menuData: Record<string, string[]> = restaurantData.menu;
    const categories = Object.keys(menuData);
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
                      {(menuData[category] as string[]).map((item, index) => {
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
              <p>{translations[locale].places.menuNote}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground italic">
              {restaurantData.tagline}
            </p>
            <DialogClose asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={onClose}
              >
                {translations[locale].places.close}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  }