"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import { Camera, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const galleryImages = [
    "/assets/gallery/image1.jpg",
    "/assets/gallery/image2.jpg",
    "/assets/gallery/image3.jpg",
    "/assets/gallery/image4.jpg",
    "/assets/gallery/image5.jpg",
    "/assets/gallery/image6.jpg",
    "/assets/gallery/image7.jpg",
    "/assets/gallery/image8.jpg",
];

export default function GallerySection() {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [showFullGallery, setShowFullGallery] = useState(false);
    const { locale, t, changeLanguage } = useLanguage();
    
    // Determine how many images to show in the first row based on screen size
    // We'll show 2 on mobile, 3 on medium screens, 4 on large screens
    const firstRowCount = 4; // This will adapt based on grid-cols classes

    useEffect(() => {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
        changeLanguage(savedLocale as 'en' | 'el');  
      }
    }, [changeLanguage]);

    // Toggle full gallery display
    const toggleFullGallery = () => {
        setShowFullGallery(!showFullGallery);
        
        // If showing full gallery, scroll slightly to show new content
        if (!showFullGallery) {
            setTimeout(() => {
                const galleryElement = document.getElementById('gallery-grid');
                if (galleryElement) {
                    galleryElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        }
    };

    // Get visible images based on current state
    const visibleImages = showFullGallery 
        ? galleryImages 
        : galleryImages.slice(0, firstRowCount);

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
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <Camera className="mx-auto h-10 w-10 text-blue-600" />
                        <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            {t('gallery.title')}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {t('gallery.description') || "Explore the beauty of Olympiada through our photo gallery"}
                        </p>
                    </div>
                    
                    <div id="gallery-grid" className="mt-10 md:mt-12 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {visibleImages.map((image, index) => (
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
                    
                    <div className="mt-8 flex justify-center">
    <Button 
        onClick={toggleFullGallery}
        className="flex items-center gap-2"
        variant="outline"
    >
        {showFullGallery ? (
            <>
                {t('gallery.showLess') || "Show Less"} 
                <ChevronUp className="h-4 w-4" />
            </>
        ) : (
            <>
                {t('gallery.viewFullGallery') || "View Full Gallery"} 
                <ChevronDown className="h-4 w-4" />
            </>
        )}
    </Button>
</div>
                </div>
            </section>
        </>
    );
}