import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "NO LOVERS HERE - The Anti-Valentine's Experience",
  description: "An exclusive 18+ sanctuary where strangers become intimate. No romance, no pretense—just raw connection. February 14th, Addis Ababa.",
  keywords: ["Valentine's Day", "Anti-Valentine", "Adult Party", "Addis Ababa", "Exclusive Event", "18+"],
  openGraph: {
    title: "NO LOVERS HERE - The Anti-Valentine's Experience",
    description: "An exclusive 18+ sanctuary. February 14th, Addis Ababa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://js.paystack.co/v1/inline.js" 
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
