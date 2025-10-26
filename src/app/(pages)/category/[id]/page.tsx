import { Metadata } from "next";
import { getCategoryById } from "@/api/category/categoryApi";
import { getAllProducts } from "@/api/product/productApi";
import CategoryStructuredData from "@/Components/SEO/CategoryStructuredData";
import dynamic from "next/dynamic";

const CategoryProductsPage = dynamic(() => import("./CategoryProductsPage"), {
  ssr: false,
});

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const category = await getCategoryById(params.id);
    const products = await getAllProducts({ categories: params.id });

    if (!category?.data?.category) {
      return {
        title: "Category Not Found | AfrometaliQ",
        description: "The requested category could not be found.",
      };
    }

    const categoryData = category.data.category;
    const productCount = products?.data?.products?.length || 0;
    
    // Create SEO-optimized title and description
    const seoTitle = `${categoryData.category_name} Products | ${productCount} Items Available | AfrometaliQ`;
    const seoDescription = `Browse ${productCount} ${categoryData.category_name} products at AfrometaliQ. High-quality metal products and construction materials. Shop online with fast delivery in Mozambique.`;
    
    // Generate keywords array
    const keywords = [
      categoryData.category_name,
      "afrometaliq",
      "metal products",
      "construction materials",
      "buy online",
      "mozambique",
      `${categoryData.category_name} products`,
      "industrial supplies",
      "building materials",
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
        canonical: `/category/${params.id}`,
      },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: `/category/${params.id}`,
        siteName: "AfrometaliQ",
        images: [
          {
            url: categoryData.thumbnail?.url || "https://afrometaliq.com/default-category.jpg",
            width: 800,
            height: 600,
            alt: `${categoryData.category_name} products`,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [categoryData.thumbnail?.url || "https://afrometaliq.com/default-category.jpg"],
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
  } catch (error) {
    return {
      title: "Category | AfrometaliQ",
      description: "Browse our wide range of metal products and construction materials.",
    };
  }
};

const page = async ({ params }: { params: { id: string } }) => {
  try {
    const category = await getCategoryById(params.id);
    const products = await getAllProducts({ categories: params.id });

    if (!category?.data?.category) {
      return <div>Category not found</div>;
    }

    return (
      <>
        <CategoryStructuredData 
          category={category.data.category} 
          products={products?.data?.products || []} 
        />
        <CategoryProductsPage />
      </>
    );
  } catch (error: any) {
    return <div>Error fetching category</div>;
  }
};

export default page;
