import React from "react";
import { PopulatedProduct } from "@/api/product/productApi";

interface ProductStructuredDataProps {
  product: PopulatedProduct;
}

const ProductStructuredData: React.FC<ProductStructuredDataProps> = ({ product }) => {
  const categoryNames = product.category.map((cat) => cat.category_name);
  const images = product.product_images.map((img) => img.url);
  const mainImage = images[0] || "";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.product_name,
    description: product.product_description,
    image: images,
    sku: product.product_code,
    brand: {
      "@type": "Brand",
      name: "AfrometaliQ"
    },
    category: categoryNames.join(", "),
    offers: {
      "@type": "Offer",
      price: product.product_selling_price,
      priceCurrency: "MZN",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "AfrometaliQ",
        url: "https://afrometaliq.com"
      },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Grade",
        value: product.product_grade
      },
      {
        "@type": "PropertyValue", 
        name: "Thickness",
        value: product.product_thickness
      },
      {
        "@type": "PropertyValue",
        name: "Size",
        value: product.product_size
      },
      {
        "@type": "PropertyValue",
        name: "Length",
        value: product.product_length
      },
      {
        "@type": "PropertyValue",
        name: "Width", 
        value: product.product_width
      },
      {
        "@type": "PropertyValue",
        name: "Unit of Measurement",
        value: product.product_uom
      }
    ].filter(prop => prop.value),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "10",
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Customer"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        reviewBody: "Excellent quality product, highly recommended!"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default ProductStructuredData;
