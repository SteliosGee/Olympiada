import type { Metadata } from "next";
import { LanguageProvider } from '@/context/LanguageContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "Olympiada Village",
  description: "Discover Olympiada, a charming coastal village in Halkidiki, Greece. Enjoy pristine beaches, authentic Greek cuisine, and rich historical sites.",
  keywords: "Olympiada, Greece, Halkidiki, beach, vacation, ancient Stagira, Greek village",
  metadataBase: new URL("https://olympiada-village.com"),
  openGraph: {
    title: "Olympiada Village",
    description: "Discover Olympiada, a charming coastal village in Halkidiki, Greece. Enjoy pristine beaches, authentic Greek cuisine, and rich historical sites.",
    images: ['/assets/banner.jpg'],
    type: 'website',
    locale: 'en_US',
    url: 'https://olympiada-village.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}