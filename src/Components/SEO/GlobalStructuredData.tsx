import React from "react";

const GlobalStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AfrometaliQ",
    url: "https://afrometaliq.com",
    logo: "https://afrometaliq.com/logo.png",
    description: "AfrometaliQ is your trusted partner for premium metal products and construction materials in Mozambique. We offer high-quality steel, aluminum, and metal products for industrial and construction needs.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MZ",
      addressRegion: "Mozambique"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Portuguese"]
    },
    sameAs: [
      "https://www.facebook.com/afrometaliq",
      "https://www.instagram.com/afrometaliq",
      "https://www.linkedin.com/company/afrometaliq",
      "https://twitter.com/afrometaliq"
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://afrometaliq.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Metal Products and Construction Materials",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Steel Products"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Aluminum Products"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Construction Materials"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default GlobalStructuredData;
