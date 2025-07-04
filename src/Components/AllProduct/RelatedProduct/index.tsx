"use client";

import Link from "next/link";
import Image from "next/image";
import { FaShareAlt, FaSpinner } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRelatedProducts } from "@/api/product/queries/useProductQuery";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "@/api/cart/query/useCartQuery";
import { useRouter } from "next/navigation";
import { getFromLS } from "@/lib/storage";
import { useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useAuthStore } from "@/store/auth";

const RelatedProduct = ({ categories }: { categories: string[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const {
    data: relatedProductsData,
    isLoading,
    error,
  } = useRelatedProducts(categories);
  const { mutate: addToCart } = useAddToCartMutation();
  const handleAddToCart = (productId: string) => {
    const token = getFromLS("accessToken");
    if (!token) {
      toast.warn("Please login before adding items to the cart.");
      router.push("/signin");
      return;
    }

    setLoadingIds((prev) => [...prev, productId]);

    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Item added to cart successfully!");
        },
        onError: () => {
          toast.error("Failed to add item to cart. Please try again.");
        },
        onSettled: () => {
          setLoadingIds((prev) => prev.filter((id) => id !== productId));
        },
      }
    );
  };

  if (isLoading) return <p>Loading related products...</p>;
  if (error)
    return <p className="text-red-500">Error fetching related products.</p>;

  const relatedProducts = relatedProductsData?.data.products || [];

  return (
    <div className="mt-10 px-4 py-8">
      <h2 className="text-2xl font-bold text-center">
        {/* {t("related_products")} */}
        Related Products
      </h2>
      {relatedProducts.length === 0 ? (
        <p>No related products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct._id}
              className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500"
            >
              {/* Product Image */}
              <div className="relative">
                {relatedProduct.product_discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                    {t("promotions")}
                  </span>
                )}
                <Link href={`/product/${relatedProduct._id}`}>
                  <Image
                    src={
                      relatedProduct.product_images[0]?.url ||
                      "/placeholder.png"
                    }
                    alt={relatedProduct.product_name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </Link>

                {/* Hover Icon */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="absolute top-2 right-2 p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300">
                    <FaShareAlt className="text-black hover:text-white h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 pb-[6rem] relative">
                <h3 className="text-[12px] font-semibold text-gray-800">
                  {relatedProduct.product_name}
                </h3>
                <div className="text-sm text-gray-500">
                <div className="text-lg font-bold text-purple-600">
                {user?._id ? (
                  <span className="text-sm font-bold text-gray-700">
                    MZN {relatedProduct.product_selling_price} Sale
                  </span>
                ) : (
                  <p className="text-[10px] text-red-500 md:mb-4">
                    {t("login_to_price")}
                  </p>
                )}
              </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <Link
                onClick={() => handleAddToCart(relatedProduct._id)}
                  href={`/cart`}
                  className="w-full py-2  flex items-center justify-center bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md"
                >
                  {t("buy_now")}
                </Link>
                <button
                  onClick={() => handleAddToCart(relatedProduct._id)}
                  className="w-full py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md"
                >
                   <div className="flex items-center justify-center gap-2">
                        {loadingIds.includes(relatedProduct?._id || "") ? (
                          <div className="flex items-center justify-center">
                            <FaSpinner className="animate-spin text-white text-lg" />
                          </div>
                        ) : (
                          t("add_to_cart")
                        )}
                        <MdShoppingCartCheckout size={25} color="white" />
                      </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
