import AllProduct from "@/Components/AllProduct";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products - Metal Products & Construction Materials",
  description: "Browse our complete catalog of metal products and construction materials. High-quality steel, aluminum, and industrial supplies available online at AfrometaliQ. Fast delivery in Mozambique.",
  keywords: [
    "all products",
    "metal products",
    "construction materials",
    "steel products",
    "aluminum products",
    "industrial supplies",
    "building materials",
    "afrometaliq",
    "mozambique",
    "buy online"
  ],
  openGraph: {
    title: "All Products - Metal Products & Construction Materials | AfrometaliQ",
    description: "Browse our complete catalog of metal products and construction materials. High-quality steel, aluminum, and industrial supplies available online.",
    url: "/product",
    siteName: "AfrometaliQ",
    images: [
      {
        url: "https://afrometaliq.com/all-products-og.jpg",
        width: 1200,
        height: 630,
        alt: "All Products - AfrometaliQ",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Products - Metal Products & Construction Materials | AfrometaliQ",
    description: "Browse our complete catalog of metal products and construction materials. High-quality steel, aluminum, and industrial supplies available online.",
    images: ["https://afrometaliq.com/all-products-og.jpg"],
    creator: "@afrometaliq",
    site: "@afrometaliq",
  },
  alternates: {
    canonical: "/product",
  },
};

const HomePage = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <AllProduct />
      </div>
  );
};

export default HomePage;
