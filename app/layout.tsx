import type { Metadata } from "next";
import { Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import portfolioConfig from "../portfolio.config";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title:       portfolioConfig.meta.title,
  description: portfolioConfig.meta.description,
  metadataBase: new URL(portfolioConfig.meta.url || 'https://kishor-portfolio.vercel.app'),
  openGraph: {
    title:       portfolioConfig.meta.title,
    description: portfolioConfig.meta.description,
    url:         portfolioConfig.meta.url,
    siteName:    portfolioConfig.name,
    type:        'website',
    locale:      'en_US',
  },
  twitter: {
    card:        'summary_large_image',
    title:       portfolioConfig.meta.title,
    description: portfolioConfig.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Caveat:wght@400;500;600&family=Great+Vibes&family=Marck+Script&family=Sacramento&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}