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
import { useLanguage } from "@/context/LanguageContext";

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
    const { locale, t, changeLanguage } = useLanguage();

    useEffect(() => {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'el')) {
        changeLanguage(savedLocale as 'en' | 'el');
      }
    }, [changeLanguage]);

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
        beachbar: createCustomIcon(FaCocktail, '#bb0a1e'), // red
        historical: createCustomIcon(FaMapMarkerAlt, '#f59e0b'), // amber
        dining: createCustomIcon(FaUtensils, '#22c55e'), // green
        default: createCustomIcon(FaMapMarkerAlt, '#ef4444') // red
      };

      setIcons(customIcons);
      setIsMounted(true);
    });
  }, []);

  const attractions: {
    id: string; // Added ID for translation key lookup
    name: string;
    position: LatLngTuple; // This ensures it's always [number, number]
    type: string;
    // description: string; // Description will come from translations
    image: string;
  }[] = [
    {
      id: "mainBeach",
      name: "Main Beach",
      position: [40.5930509848559, 23.7848929060503] as LatLngTuple,
      type: "nature",
      // description: "Beautiful sandy beach with crystal clear waters",
      image: "/assets/gallery/image1.jpg"
    },
    {
      id: "sykia",
      name: "Sykia",
      position: [40.59123942535739, 23.791080190208763] as LatLngTuple,
      type: "nature",
      // description: "A hidden gem with stunning views and clear waters",
      image: "/assets/gallery/image3.jpg"
    },
    {
      id: "kephalas",
      name: "Kephalas",
      position: [40.588371809849335, 23.794958834117228] as LatLngTuple,
      type: "nature",
      // description: "A secluded beach with soft sand and clear waters",
      image: "/assets/gallery/image4.jpg"
    },
    {
      id: "ancientStagira",
      name: "Ancient Stagira",
      position: [40.59203540368834, 23.795194865506105] as LatLngTuple,
      type: "historical",
      // description: "Birthplace of Aristotle with well-preserved ruins",
      image: "/assets/gallery/image2.jpg"
    },
    {
      id: "perroquet",
      name: "Perroquet",
      position: [40.59294305187765, 23.783197991770713] as LatLngTuple,
      type: "beachbar",
      // description: "Beach bar with amazing cocktails and sunset views",
      image: "/assets/dining/perroquet/primer.jpg"
    },
    {
      id: "molos",
      name: "Molos",
      position: [40.59141872158969, 23.784645615961026] as LatLngTuple,
      type: "dining",
      // description: "Pizza and pasta restaurant with sea views",
      image: "/assets/dining/molos/primer.jpg"
    },
    {
      id: "akroyali",
      name: "Akroyali",
      position: [40.59068547068111, 23.786222506316822] as LatLngTuple,
      type: "dining",
      // description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/akroyali/primer.jpg"
    },
    {
      id: "apoplous",
      name: "Apoplous",
      position: [40.59379218400287, 23.782113176882884] as LatLngTuple,
      type: "beachbar",
      // description: "Beach bar with cocktails and snacks",
      image: "/assets/dining/apoplous/primer.jpg"
    },
    {
      id: "vertigo",
      name: "Vertigo",
      position: [40.5922604326194, 23.783617495633123] as LatLngTuple,
      type: "beachbar",
      // description: "Beach bar with cocktails and snacks",
      image: "/assets/dining/vertigo/primer.png"
    },
    {
      id: "kuzina",
      name: "Kuzina",
      position: [40.59201695098855, 23.783835493051846] as LatLngTuple,
      type: "dining",
      // description: "Mediterranean restaurant with a modern twist",
      image: "/assets/dining/kuzina/primer.png"
    },
    {
      id: "passepartout",
      name: "Passepartout",
      position: [40.59162953826354, 23.78433944768181] as LatLngTuple,
      type: "beachbar",
      // description: "Beach bar with cocktails and snacks",
      image: "/assets/dining/passepartout/primer.png"
    },
    {
      id: "karavopetra",
      name: "Karavopetra",
      position: [40.59154482305826, 23.784478123340524] as LatLngTuple,
      type: "dining",
      // description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/karavopetra/primer.jpg"
    },
    {
      id: "kapetanManolis",
      name: "Kapetan Manolis",
      position: [40.591157322104884, 23.78479545336988] as LatLngTuple,
      type: "dining",
      // description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/kapetanmanolis/primer.jpg"
    },
    {
      id: "liberty",
      name: "Liberty",
      position: [40.59089815814047, 23.78533789496009] as LatLngTuple,
      type: "dining",
      // description: "Fresh coffee and pastries with sea views",
      image: "/assets/dining/liberty/primer.png"
    },
    {
      id: "olympic",
      name: "Olympic",
      position: [40.590723963482766, 23.786023063131626] as LatLngTuple,
      type: "dining",
      // description: "Traditional Greek taverna with fresh seafood",
      image: "/assets/dining/olympic/primer.jpg"
    },
    {
      id: "yiasemi",
      name: "Yiasemi",
      position: [40.591202821951015, 23.784550397548916] as LatLngTuple,
      type: "dining",
      // description: "Patissery with fresh coffee and pastries",
      image: "/assets/dining/yiasemi/primer.png"
    }
  ];

  return (
    <section id="map" className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <MapPin className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('map.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('map.subtitle')}
          </p>
        </div>
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
          {isMounted && Object.keys(icons).length > 0 ? (
            <MapContainer
              center={[40.591616637074594, 23.786827570191623]}
              zoom={16}
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
                      <p className="text-sm">{t(`map.attractions.${attraction.id}.description`)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100">
              <p>{t('map.loading')}</p>
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 px-4">
          <div className="flex items-center gap-2">
            <FaUmbrellaBeach className="text-blue-500 text-lg" />
            <span className="text-sm">{t('map.legend.beaches')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-amber-500 text-lg" />
            <span className="text-sm">{t('map.legend.historical')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUtensils className="text-green-500 text-lg" />
            <span className="text-sm">{t('map.legend.restaurants')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCocktail className="text-red-500 text-lg" />
            <span className="text-sm">{t('map.legend.beachBars')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}