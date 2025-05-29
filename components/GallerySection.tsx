"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import { Camera, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
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
    "/assets/gallery/image9.jpg",
    "/assets/gallery/image10.jpg",
    "/assets/gallery/image11.jpg",
    "/assets/gallery/image12.jpg",
];

export default function GallerySection() {
    const { t, changeLanguage } = useLanguage();
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [showFullGallery, setShowFullGallery] = useState(false);
    const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});
    const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

    useEffect(() => {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
        changeLanguage(savedLocale as 'en' | 'el');  
      }
    }, [changeLanguage]);

    const handleImageLoad = (src: string) => {
        setImageLoadStates(prev => ({ ...prev, [src]: true }));
    };

    const navigateLightbox = (direction: 'prev' | 'next') => {
        const currentIndex = galleryImages.indexOf(lightboxImage!);
        let newIndex;
        
        if (direction === 'prev') {
          newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
        } else {
          newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
        }
        
        setLightboxImage(galleryImages[newIndex]);
        setCurrentLightboxIndex(newIndex);
    };

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
        : galleryImages.slice(0, 4);

    const ImageCard = ({ src, index }: { src: string; index: number }) => (
        <div 
          className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
          onClick={() => {
            setLightboxImage(src);
            setCurrentLightboxIndex(index);
          }}
        >
          {!imageLoadStates[src] && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoadStates[src] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(src)}
            loading={index < 4 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="h-4 w-4" />
          </div>
        </div>
      );

    return (
        <>
            {lightboxImage && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                    >
                        <X className="h-8 w-8" />
                    </button>
                    
                    {/* Navigation arrows */}
                    <button
                        onClick={() => navigateLightbox('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                    >
                        <ChevronLeft className="h-12 w-12" />
                    </button>
                    
                    <button
                        onClick={() => navigateLightbox('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                    >
                        <ChevronRight className="h-12 w-12" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                        {currentLightboxIndex + 1} / {galleryImages.length}
                    </div>
                    
                    <Image
                        src={lightboxImage}
                        alt="Gallery image"
                        width={1200}
                        height={800}
                        className="max-w-full max-h-full object-contain"
                    />
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