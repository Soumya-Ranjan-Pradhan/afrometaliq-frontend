import { getAllProducts } from "@/api/product/productApi";
import { MetadataRoute } from "next";

const FRONTEND_URL = "https://www.afrometaliq.com"
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
//   const start = id * 50000;
//   const end = start + 50000;
  const products = await getAllProducts();

  return products.data.products.map((product) => ({
    url: `${FRONTEND_URL}/product/${product._id}`,
    lastModified: new Date(product.updatedAt),
  }));
}
