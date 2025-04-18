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

export function MenuModal({
  name,
  isOpen,
  onClose,
}: {
  name: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { locale, t } = useLanguage();

  const restaurantPath = `places.restaurants.${name}`;
  const tagline = t(`${restaurantPath}.tagline`);
  const menuPath = `${restaurantPath}.menu`;
  const menuData = t(menuPath);

  if (!menuData || typeof menuData !== "object") return null;

  const categories = Object.keys(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-lg p-4 sm:p-6 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            {name}
          </DialogTitle>
          <div className="flex justify-center mt-2">
            <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Tabs
            defaultValue={categories[0]}
            value={activeCategory}
            onValueChange={setActiveCategory}
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full flex justify-between mb-4 min-w-[400px]">
                {categories.map((category) => (
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

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="px-1">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <h3 className="text-lg font-medium mb-4 text-blue-600 border-b pb-2">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {(menuData[category] as string[]).map((item, index) => {
                      const [itemName, price] = item.split(" - ");
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-between pb-2 border-b border-slate-200 last:border-0"
                        >
                          <span className="font-medium">{itemName}</span>
                          <span className="text-blue-600 font-semibold">
                            {price}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>{t("places.menuNote")}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
          <p className="text-sm text-muted-foreground italic text-center sm:text-left">
            {tagline}
          </p>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
              onClick={onClose}
            >
              {t("places.close")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
