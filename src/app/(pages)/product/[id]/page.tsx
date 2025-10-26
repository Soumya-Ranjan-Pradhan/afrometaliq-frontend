import React from "react";
import ProductSinglePage from "./ProductSinglePage";
import { getProductById } from "@/api/product/productApi";
import { Metadata } from "next";
import ProductStructuredData from "@/Components/SEO/ProductStructuredData";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found | AfrometaliQ",
      description: "The requested product could not be found.",
    };
  }

  const productData = product.data.product;
  const categoryNames = productData?.category.map((cat) => cat.category_name) || [];
  const images = productData?.product_images?.map((img) => img?.url) || [];
  const mainImage = images[0] || "";
  
  // Create SEO-optimized title and description
  const seoTitle = `${productData.product_name} | ${categoryNames.join(", ")} | AfrometaliQ`;
  const seoDescription = `${productData.product_description} | Price: MZN ${productData.product_selling_price} | ${categoryNames.join(", ")} | Buy online at AfrometaliQ`;
  
  // Generate keywords array
  const keywords = [
    productData.product_name,
    ...categoryNames,
    "afrometaliq",
    "metal products",
    "construction materials",
    "buy online",
    "mozambique",
    productData.product_grade,
    productData.product_thickness,
    productData.product_size,
  ].filter(Boolean);

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords,
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
      canonical: `/product/${params.id}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `/product/${params.id}`,
      siteName: "AfrometaliQ",
      images: [
        {
          url: mainImage,
          width: 800,
          height: 600,
          alt: productData.product_name,
        },
        ...images.slice(1, 4).map((img) => ({
          url: img,
          width: 800,
          height: 600,
          alt: productData.product_name,
        })),
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [mainImage],
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
  };
};

const page = async ({ params }: { params: { id: string } }) => {
  try {
    const product = await getProductById(params.id);

    if (!product || !product?.data?.product) {
      return <div>Product not found</div>;
    }

    return (
      <>
        <ProductStructuredData product={product.data.product} />
        <ProductSinglePage id={params.id} product={product.data.product} />
      </>
    );
  } catch (error: any) {
    return <div>Error fetching product</div>;
  }
};

export default page;
