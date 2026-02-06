import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://no-lovers-here.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NO LOVERS HERE - Valentine's Day 2026 | Port Harcourt",
    template: "%s | NO LOVERS HERE"
  },
  description: "Join the ultimate anti-Valentine's Day party on February 14, 2026 at CJ&J Lounge, Port Harcourt. An exclusive 18+ event for singles. Premium drinks, DJ sets, and unforgettable vibes. Get your tickets now!",
  keywords: [
    "NO LOVERS HERE",
    "Valentine's Day Party",
    "Anti-Valentine Event",
    "Port Harcourt Events",
    "Singles Party",
    "February 14 2026",
    "CJ&J Lounge",
    "18+ Event",
    "Nigeria Nightlife",
    "Port Harcourt Nightlife",
    "Valentine's Day 2026",
    "Singles Event Nigeria",
    "Adult Party Port Harcourt"
  ],
  authors: [{ name: "NO LOVERS HERE" }],
  creator: "NO LOVERS HERE",
  publisher: "NO LOVERS HERE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "NO LOVERS HERE",
    title: "NO LOVERS HERE - Valentine's Day 2026 Party | Port Harcourt",
    description: "The ultimate anti-Valentine's Day experience. February 14, 2026 at CJ&J Lounge, Port Harcourt. 18+ exclusive event for singles. Get tickets now!",
    images: [
      {
        url: "/flyer.png",
        width: 1200,
        height: 630,
        alt: "NO LOVERS HERE - Valentine's Day 2026 Event Flyer",
        type: "image/png",
      },
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "NO LOVERS HERE Logo",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NO LOVERS HERE - Valentine's Day 2026 | Port Harcourt",
    description: "Ultimate anti-Valentine's party. Feb 14, 2026 at CJ&J Lounge. 18+ singles event. Get tickets!",
    images: ["/flyer.png"],
    creator: "@nolovershere",
    site: "@nolovershere",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.png",
      },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  category: "Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "NO LOVERS HERE - Valentine's Day 2026",
    "description": "The ultimate anti-Valentine's Day party for singles. An exclusive 18+ event with premium drinks, DJ sets, and unforgettable vibes.",
    "image": `${process.env.NEXT_PUBLIC_APP_URL || "https://no-lovers-here.vercel.app"}/flyer.png`,
    "startDate": "2026-02-14T21:00:00+01:00",
    "endDate": "2026-02-15T00:00:00+01:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "CJ&J Lounge, Suites and Apartment Ltd",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "184 NTA/Choba, Adjacent Open University",
        "addressLocality": "Phalga",
        "addressRegion": "Port Harcourt",
        "postalCode": "500272",
        "addressCountry": "NG"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "NO LOVERS HERE",
      "url": process.env.NEXT_PUBLIC_APP_URL || "https://no-lovers-here.vercel.app"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Men's Ticket",
        "price": "18000",
        "priceCurrency": "NGN",
        "availability": "https://schema.org/InStock",
        "url": process.env.NEXT_PUBLIC_APP_URL || "https://no-lovers-here.vercel.app",
        "validFrom": "2026-01-01T00:00:00+01:00"
      },
      {
        "@type": "Offer",
        "name": "Women's Ticket",
        "price": "8000",
        "priceCurrency": "NGN",
        "availability": "https://schema.org/InStock",
        "url": process.env.NEXT_PUBLIC_APP_URL || "https://no-lovers-here.vercel.app",
        "validFrom": "2026-01-01T00:00:00+01:00"
      }
    ],
    "performer": {
      "@type": "MusicGroup",
      "name": "Premium DJ Sets"
    }
  };

  return (
    <html lang="en">
      <head>
        <Script 
          src="https://js.paystack.co/v1/inline.js" 
          strategy="beforeInteractive"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://api.paystack.co" />
        <link rel="dns-prefetch" href="https://api.paystack.co" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
