"use client";

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { LatLngTuple } from 'leaflet';
import { 
  FaCocktail,
  FaUtensils,
  FaUmbrellaBeach,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { renderToString } from 'react-dom/server';

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function OlympiadaMap() {
  const [isMounted, setIsMounted] = useState(false);
  const [icons, setIcons] = useState<{[key: string]: any}>({});

  useEffect(() => {
    // Import leaflet and its CSS on client-side only
    Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css')
    ]).then(([L]) => {
      const leaflet = L.default;
      
      // Create custom icons using React Icons
      const createCustomIcon = (IconComponent: any, color: string) => {
        const iconHtml = renderToString(
          <div style={{ color, fontSize: '32px' }}>
            <IconComponent />
          </div>
        );
        
        return leaflet.divIcon({
          html: iconHtml,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
      };
      
      const customIcons = {
        nature: createCustomIcon(FaUmbrellaBeach, '#3b82f6'), // blue
        beachbar: createCustomIcon(FaCocktail, '#3b82f6'), // blue
        historical: createCustomIcon(FaMapMarkerAlt, '#f59e0b'), // amber
        dining: createCustomIcon(FaUtensils, '#22c55e'), // green
        default: createCustomIcon(FaMapMarkerAlt, '#ef4444') // red
      };
      
      setIcons(customIcons);
      setIsMounted(true);
    });
  }, []);

  const attractions: {
    name: string;
    position: LatLngTuple; // This ensures it's always [number, number]
    type: string;
    description: string;
    image: string;
  }[] = [
    { 
      name: "Main Beach", 
      position: [40.5912, 23.7971] as LatLngTuple,
      type: "nature",
      description: "Beautiful sandy beach with crystal clear waters",
      image: "/assets/gallery/image1.jpg" 
    },
    { 
      name: "Ancient Stagira", 
      position: [40.5953, 23.7969] as LatLngTuple,
      type: "historical",
      description: "Birthplace of Aristotle with well-preserved ruins",
      image: "/assets/gallery/image2.jpg" 
    },
    { 
      name: "Perroquet", 
      position: [40.59294305187765, 23.783197991770713] as LatLngTuple,
      type: "beachbar",
      description: "Beach bar with amazing cocktails and sunset views",
      image: "/assets/dining/perroquet/primer.jpg" 
    },
    { 
      name: "Molos", 
      position: [40.59141872158969, 23.784645615961026] as LatLngTuple,
      type: "dining",
      description: "Pizza and pasta restaurant with sea views",
      image: "/assets/dining/molos/primer.jpg" 
    },
    { 
      name: "Akroyali", 
      position: [40.59068547068111, 23.786222506316822] as LatLngTuple,
      type: "dining",
      description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/akroyali/primer.jpg" 
    },
    {
      name: "Apoplous", 
      position: [40.59379218400287, 23.782113176882884] as LatLngTuple,
      type: "beachbar",
      description: "Beach bar with cocktails and snacks",
      image: "/assets/dining/apoplous/primer.jpg"
    },
    {
      name: "Vertigo", 
      position: [40.5922604326194, 23.783617495633123] as LatLngTuple,
      type: "beachbar",
      description: "Beach bar with cocktails and snacks",
      image: "/assets/dining/vertigo/primer.png"
    },
    {
      name: "Kuzina", 
      position: [40.59201695098855, 23.783835493051846] as LatLngTuple,
      type: "dining",
      description: "Mediterranean restaurant with a modern twist",
      image: "/assets/dining/kuzina/primer.png"
    },
    {
      name: "Passepartout", 
      position: [40.59162953826354, 23.78433944768181] as LatLngTuple,
      type: "beachbar",
      description: "Beach bar with cocktails and snacks",
      image: "/assets/dining/passepartout/primer.png"
    },
    {
      name: "Karavopetra", 
      position: [40.59154482305826, 23.784478123340524] as LatLngTuple,
      type: "dining",
      description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/karavopetra/primer.jpg"
    },
    {
      name: "Kapetan Manolis", 
      position: [40.591157322104884, 23.78479545336988] as LatLngTuple,
      type: "dining",
      description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/kapetanmanolis/primer.jpg"
    },
    {
      name: "Liberty", 
      position: [40.59089815814047, 23.78533789496009] as LatLngTuple,
      type: "dining",
      description: "Fresh coffee and pastries with sea views",
      image: "/assets/dining/liberty/primer.png"
    },
    {
      name: "Olympic", 
      position: [40.590723963482766, 23.786023063131626] as LatLngTuple,
      type: "dining",
      description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/olympic/primer.jpg"
    },
    {
      name: "Yiasemi", 
      position: [40.591202821951015, 23.784550397548916] as LatLngTuple,
      type: "dining",
      description: "Patissery with fresh coffee and pastries",
      image: "/assets/dining/yiasemi/primer.png"
    }
  ];
  
  return (
    <section id="map" className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <MapPin className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explore Olympiada
          </h2>
          <p className="mt-4 text-muted-foreground">
            Find the best beaches, restaurants, and attractions in our village
          </p>
        </div>
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
          {isMounted && Object.keys(icons).length > 0 ? (
            <MapContainer 
              center={[40.5912, 23.7971]} 
              zoom={14} 
              className="h-full w-full"
              scrollWheelZoom={false}
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {attractions.map((attraction, index) => (
                <Marker 
                  key={index} 
                  position={attraction.position}
                  icon={icons[attraction.type] || icons.default}
                >
                  <Popup>
                    <div className="p-1 max-w-[200px]">
                      <h3 className="font-bold text-lg">{attraction.name}</h3>
                      {attraction.image && (
                        <div className="my-2 h-[100px] w-full overflow-hidden rounded">
                          <img 
                            src={attraction.image} 
                            alt={attraction.name}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      )}
                      <p className="text-sm">{attraction.description}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100">
              <p>Loading map...</p>
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 px-4">
          <div className="flex items-center gap-2">
            <FaUmbrellaBeach className="text-blue-500 text-lg" />
            <span className="text-sm">Beaches</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-amber-500 text-lg" />
            <span className="text-sm">Historical Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUtensils className="text-green-500 text-lg" />
            <span className="text-sm">Restaurants</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCocktail className="text-blue-500 text-lg" />
            <span className="text-sm">Beach Bars</span>
          </div>
        </div>
      </div>
    </section>
  );
}