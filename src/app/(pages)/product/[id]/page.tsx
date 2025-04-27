import React from "react";
import ProductSinglePage from "./ProductSinglePage";
import { getProductById } from "@/api/product/productApi";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const product = await getProductById(params.id);

  if (!product) {
    return {};
  }
  const category =
    product?.data?.product?.category.map((cat) => cat.category_name) || [];

  const images = product?.data?.product?.product_images?.map((img) => img?.url);

  return {
    title: product.data.product.product_name,
    description: product.data.product.product_description,
    keywords: [product.data.product.product_name, ...category],
    openGraph: {
      title: product.data.product.product_name,
      description: product.data.product.product_description,
      images: images,
    },
  };
};

const page = async ({ params }: { params: { id: string } }) => {
  try {
    const product = await getProductById(params.id);

    if (!product || !product?.data?.product) {
      return <div>Product not found</div>;
    }

    return <ProductSinglePage id={params.id} product={product.data.product} />;
  } catch (error: any) {
    return <div>Error fetching product</div>;
  }
};

export default page;
