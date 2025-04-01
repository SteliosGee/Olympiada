"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Anchor,
  SailboatIcon as Boat,
  Calendar,
  Camera,
  History,
  MapPin,
  Menu,
  Utensils,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import DiningSection from "@/components/DiningSection";
import OlympiadaMap from "@/components/Map";
import AccommodationsSection from  "@/components/AccommodationsSection";
import ActivitiesSection from "@/components/ActivitiesSection";

export default function Home() {
  const galleryImages = [
    "/assets/gallery/image1.jpg",
    "/assets/gallery/image2.jpg",
    "/assets/gallery/image3.jpg",
    "/assets/gallery/image4.jpg",
  ];


  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  

  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Lightbox */}
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

      <header className="sticky top-0 z-50 bg-white shadow-sm w-full bg-opacity-80">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Anchor className="h-6 w-6" />
            <span>Olympiada</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="#about"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/pages/history"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              History
            </Link>

            <Link
              href="#activities"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Activities
            </Link>
            <Link
              href="#accommodations"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Stay
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Gallery
            </Link>
            <Link
              href="#dining"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Dining
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-4">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[75%] sm:w-[350px]">
              <div className="flex flex-col gap-6 pt-10">
                <Link
                  href="#about"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() =>
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new Event("close", { bubbles: true }))
                  }
                >
                  About
                </Link>
                <Link
                  href="#history"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() =>
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new Event("close", { bubbles: true }))
                  }
                >
                  History
                </Link>
                <Link
                  href="#activities"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() =>
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new Event("close", { bubbles: true }))
                  }
                >
                  Activities
                </Link>
                <Link
                  href="#accommodations"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() =>
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new Event("close", { bubbles: true }))
                  }
                >
                  Stay
                </Link>
                <Link
                  href="#gallery"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() =>
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new Event("close", { bubbles: true }))
                  }
                >
                  Gallery
                </Link>
                <Link
                  href="#dining"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() =>
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new Event("close", { bubbles: true }))
                  }
                >
                  Dining
                </Link>
                <Link
                  href="#map"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() =>
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new Event("close", { bubbles: true }))
                  }
                >
                  Map
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh]">
          <Image
            src="/assets/banner.jpg"
            alt="Olympiada Village"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex h-full flex-col items-center justify-center text-center text-white px-4 sm:px-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-[90%] sm:max-w-3xl">
              Welcome to Olympiada
            </h1>
            <p className="mt-4 max-w-xs sm:max-w-sm md:max-w-2xl text-base sm:text-lg">
              Discover the hidden gem of the Mediterranean coast, where history
              meets natural beauty
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                <Link href="#accommodations">Book Your Stay</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto"
              >
                <Link href="#about">Explore</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Our Village
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Nestled along the pristine coastline, Olympiada is a charming
                  village that offers a perfect blend of traditional Greek
                  culture, stunning natural landscapes, and modern amenities.
                  Named after Alexander the Great's mother, Olympias, our
                  village has a rich history dating back to ancient times.
                </p>
                <p className="mt-4 text-muted-foreground">
                  With crystal-clear waters, golden sandy beaches, and lush
                  green mountains as a backdrop, Olympiada provides the ideal
                  setting for a relaxing and memorable vacation. Our friendly
                  locals welcome visitors with open arms and are eager to share
                  their traditions and way of life.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Halkidiki, Northern Greece</span>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/assets/olympiada.jpg"
                  alt="Olympiada Village View"
                  fill
                  className="object-cover border-[5px] rounded-lg border-black"
                />
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <History className="mx-auto h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Rich in History
              </h2>
              <p className="mt-4 text-muted-foreground">
                Explore the fascinating past of Olympiada, from ancient Stagira
                to modern times
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Ancient Stagira</h3>
                <p className="mt-2 text-muted-foreground">
                  Just a short distance from Olympiada lies Ancient Stagira, the
                  birthplace of Aristotle, one of history's greatest
                  philosophers. Explore the archaeological site and walk in the
                  footsteps of this influential thinker.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Byzantine Era</h3>
                <p className="mt-2 text-muted-foreground">
                  During the Byzantine period, the region flourished as an
                  important cultural and religious center. Discover the remnants
                  of Byzantine churches and monasteries that dot the landscape
                  around Olympiada.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Modern Revival</h3>
                <p className="mt-2 text-muted-foreground">
                  In recent decades, Olympiada has transformed from a quiet
                  fishing village into a beloved destination that carefully
                  balances tourism with preserving its authentic character and
                  traditions.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="#history">Learn More About Our History</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <ActivitiesSection />

        {/* Map Section */}

        {/* Accommodations Section */}
        <AccommodationsSection/>

        {/* Dining Section */}
        <DiningSection />

        {/* Map Section */}
        <OlympiadaMap />

        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <Camera className="mx-auto h-10 w-10 text-blue-600" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Gallery
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

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white md:py-24">
          <div className="container text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Plan Your Visit to Olympiada
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Experience the magic of our coastal village. Book your stay now
              and create memories that will last a lifetime.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Link href="#accommodations">Book Accommodation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-blue-700"
              >
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold"
              >
                <Anchor className="h-6 w-6" />
                <span>Olympiada</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                A charming coastal village in Halkidiki, Greece, offering
                natural beauty, rich history, and authentic experiences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#history"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    href="#activities"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Activities
                  </Link>
                </li>
                <li>
                  <Link
                    href="#accommodations"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Stay
                  </Link>
                </li>
                <li>
                  <Link
                    href="#gallery"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="#dining"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Dining
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Olympiada, Halkidiki, Greece</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-4 w-4">✉️</span>
                  <span>info@olympiada-village.gr</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-4 w-4">📞</span>
                  <span>+30 23760 51234</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="mt-4 flex gap-4">
                <Link
                  href="#"
                  className="rounded-full bg-slate-200 p-2 hover:bg-slate-300"
                >
                  <span className="sr-only">Facebook</span>
                  <span className="h-5 w-5">📱</span>
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-slate-200 p-2 hover:bg-slate-300"
                >
                  <span className="sr-only">Instagram</span>
                  <span className="h-5 w-5">📸</span>
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-slate-200 p-2 hover:bg-slate-300"
                >
                  <span className="sr-only">Twitter</span>
                  <span className="h-5 w-5">🐦</span>
                </Link>
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="#newsletter">Subscribe to Newsletter</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Olympiada Village. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
