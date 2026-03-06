import type { Metadata } from "next";
import "@fontsource/mozilla-text/latin-700.css";
import "./globals.css";
import FadeInObserver from "./components/FadeInObserver";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ContactModalProvider } from "./components/ContactModal/ContactModal";

export const metadata: Metadata = {
  title: "BioTap - Secure Biometric Payment Solutions",
  description: "BioTap is a cutting-edge biometric payment technology company at the forefront of innovation in secure digital banking. Established in 2024, we&apos;re revolutionizing how people interact with financial services through advanced biometric authentication.",
  keywords: ["Secure Digital Payments", "Biometric Authentication", "Contactless Payment Technology", "Public Procurement System", "Digital Wallet Integration", "Payment Gateway Solution", "Identity-Based Transactions"],
  authors: [{ name: "BioTap" }],
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
    shortcut: '/images/favicon.png',
  },
  openGraph: {
    title: "BioTap - Secure Biometric Payment Solution",
    description: "BioTap is a cutting-edge biometric payment technology company at the forefront of innovation in secure digital banking. Established in 2024, we&apos;re revolutionizing how people interact with financial services through advanced biometric authentication.",
    type: "website",
    url: "https://biotapapp.com",
    siteName: "BioTap",
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'BioTap Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BioTap - Secure Biometric Payment Solution",
    description: "BioTap is a cutting-edge biometric payment technology company at the forefront of innovation in secure digital banking. Established in 2024, we&apos;re revolutionizing how people interact with financial services through advanced biometric authentication.",
    images: ['/images/favicon.png'],
  },
  metadataBase: new URL('https://biotapapp.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <link rel="shortcut icon" href="/images/favicon.png" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Prompt:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        
        {/* Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sinergia Negotium",
              "url": "https://www.biotapapp.com",
              "logo": "https://www.biotapapp.com/images/favicon.png",
              "description": "BioTap is a cutting-edge biometric payment technology company at the forefront of innovation in secure digital banking. Established in 2024, we&apos;re revolutionizing how people interact with financial services through advanced biometric authentication.",
              "sameAs": [
                "https://www.biotapapp.com"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "url": "https://www.biotapapp.com"
              }
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <ContactModalProvider>
            <FadeInObserver />
            {children}
            <ScrollToTop />
          </ContactModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
