import React from "react";
import { Category } from "@/api/category/categoryApi";
import { Product } from "@/api/product/productApi";

interface CategoryStructuredDataProps {
  category: Category;
  products: Product[];
}

const CategoryStructuredData: React.FC<CategoryStructuredDataProps> = ({ category, products }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.category_name} Products`,
    description: `Browse ${products.length} ${category.category_name} products at AfrometaliQ. High-quality metal products and construction materials.`,
    url: `https://afrometaliq.com/category/${category._id}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.product_name,
          description: product.product_description,
          image: product.product_images[0]?.url,
          sku: product.product_code,
          offers: {
            "@type": "Offer",
            price: product.product_selling_price,
            priceCurrency: "MZN",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "AfrometaliQ",
              url: "https://afrometaliq.com"
            }
          }
        }
      }))
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://afrometaliq.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Categories",
          item: "https://afrometaliq.com/categories"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category.category_name,
          item: `https://afrometaliq.com/category/${category._id}`
        }
      ]
    },
    publisher: {
      "@type": "Organization",
      name: "AfrometaliQ",
      url: "https://afrometaliq.com",
      logo: {
        "@type": "ImageObject",
        url: "https://afrometaliq.com/logo.png"
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://afrometaliq.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default CategoryStructuredData;
