"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import { Camera, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const galleryImages = [
    "/assets/gallery/image1.jpg",
    "/assets/gallery/image2.jpg",
    "/assets/gallery/image3.jpg",
    "/assets/gallery/image4.jpg",
  ];


export default function GallerySection() {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const { locale, t, changeLanguage } = useLanguage();
    

    useEffect(() => {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
        changeLanguage(savedLocale as 'en' | 'el');  
      }
    }, [changeLanguage]);

    return (
        <>
        {lightboxImage && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 sm:p-4"
              onClick={() => setLightboxImage(null)}
            >
              <div className="relative max-h-[95vh] max-w-[95vw] sm:max-h-[90vh] sm:max-w-[90vw]">
                <div className="relative h-auto w-auto">
                  <Image
                    src={lightboxImage}
                    alt="Gallery image"
                    width={800}
                    height={600}
                    className="max-h-[85vh] rounded-md object-contain"
                  />
                </div>
                <button
                  className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 rounded-full bg-white p-1 sm:p-2 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(null);
                  }}
                >
                  <X className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </div>
          )}
                <section id="gallery" className="py-16 md:py-24 bg-slate-50">
                  <div className="container mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                      <Camera className="mx-auto h-10 w-10 text-blue-600" />
                      <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {t('gallery.title')}
                      </h2>
                      <p className="mt-4 text-muted-foreground">
                        Explore the beauty of Olympiada through our photo gallery
                      </p>
                    </div>
                    <div className="mt-10 md:mt-12 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                          onClick={() => setLightboxImage(image)}
                        >
                          <Image
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <Button asChild>
                        <Link href="#gallery">View Full Gallery</Link>
                      </Button>
                    </div>
                    </div>
                </section>
        </>
    );
}