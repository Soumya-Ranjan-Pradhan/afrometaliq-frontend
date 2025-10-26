import ReactQueryProvider from "@/context/ReactQueryProvider";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Header/Sidebar";
import Footer from "@/Components/Footer";
import type { Metadata } from "next";
import "./globals.css";
import { FaWhatsapp } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "@/i18n";
import Link from "next/link";
import GlobalStructuredData from "@/Components/SEO/GlobalStructuredData";

export const metadata: Metadata = {
  title: {
    default: "AfrometaliQ - Premium Metal Products & Construction Materials",
    template: "%s | AfrometaliQ"
  },
  description: "AfrometaliQ is your trusted partner for premium metal products and construction materials in Mozambique. We offer high-quality steel, aluminum, and metal products for industrial and construction needs. Shop online with fast delivery.",
  keywords: [
    "afrometaliq",
    "metal products",
    "construction materials",
    "steel products",
    "aluminum products",
    "industrial supplies",
    "building materials",
    "mozambique",
    "buy online",
    "metal fabrication",
    "construction supplies",
    "steel sheets",
    "metal pipes",
    "industrial metals"
  ],
  authors: [{ name: "AfrometaliQ" }],
  creator: "AfrometaliQ",
  publisher: "AfrometaliQ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://afrometaliq.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AfrometaliQ - Premium Metal Products & Construction Materials",
    description: "AfrometaliQ is your trusted partner for premium metal products and construction materials in Mozambique. We offer high-quality steel, aluminum, and metal products for industrial and construction needs.",
    url: "https://afrometaliq.com",
    siteName: "AfrometaliQ",
    images: [
      {
        url: "https://afrometaliq.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AfrometaliQ - Premium Metal Products & Construction Materials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfrometaliQ - Premium Metal Products & Construction Materials",
    description: "AfrometaliQ is your trusted partner for premium metal products and construction materials in Mozambique.",
    images: ["https://afrometaliq.com/og-image.jpg"],
    creator: "@afrometaliq",
    site: "@afrometaliq",
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
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  category: "e-commerce",
  classification: "Business",
  other: {
    "geo.region": "MZ",
    "geo.country": "Mozambique",
    "geo.placename": "Mozambique",
    "ICBM": "-18.665695, 35.529562",
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
        <style>
          {`
            @keyframes jump {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `}
        </style>
      </head>
      <body className="relative">
        <GlobalStructuredData />
        <ReactQueryProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
