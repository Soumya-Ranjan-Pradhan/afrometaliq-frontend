"use client";
import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useAllProducts } from "@/api/product/queries/useProductQuery";
import { useGlobalStore } from "@/store/global";
import ProductSkeletons from "../Skeleton/ProductSkeleton";
import { useAuthStore } from "@/store/auth";
import { useAddToCartMutation } from "@/api/cart/query/useCartQuery";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  salesCount: number;
  imageUrl: string;
  stock: string;
  rating: number;
  description: string;
};

const Product = () => {
  const router = useRouter();
  const { data, isLoading, error } = useAllProducts();
  const { mutate: addToCart } = useAddToCartMutation();
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  const handleAddToCart = (productId: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.warn("Please login before adding items to the cart.");
      router.push("/signin");
      return;
    }

    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Item added to cart successfully!");
        },
        onError: () => {
          toast.error("Failed to add item to cart. Please try again.");
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeletons key={index} />
        ))}
      </div>
    );

  if (error) return <div>Error fetching products</div>;

  // Filter products without a discount and limit to 8
  const filteredProducts = data?.data.products
    .filter((product) => product.product_discount === 0)
    .slice(0, 8);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-3xl font-semibold mb-8">
        {t("product_browser")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500"
          >
            {/* Product Image */}
            <div className="relative">
              <Link key={product._id} href={`/product/${product._id}`}>
                <Image
                  src={product.product_images[0]?.url}
                  alt={product.product_name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md"
                />
              </Link>

              {/* Icons to show on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="absolute top-2 right-2 p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300">
                  <FaShareAlt className="text-black hover:text-white h-6 w-6" />
                </button>
              </div>
            </div>
            {/* Product Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.product_name}
              </h3>

              <div className="text-sm text-gray-500 mt-1">
                {user?._id ? (
                  <span className="text-sm font-bold text-gray-700">
                    MZN {product.product_selling_price} {t("sale")}
                  </span>
                ) : (
                  <p className="text-sm text-red-500">{t("login_to_price")}</p>
                )}
              </div>
            </div>
            {/* Buttons */}

            <div className="flex items-center justify-between gap-2 mt-4">
              <Link
                href={`/buynow/${product._id}`}
                className="flex-1 h-12 py-2 px-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md text-center flex items-center justify-center whitespace-nowrap"
                style={{ lineHeight: "1.5", fontSize: "14px" }}
              >
                {t("buy_now")}
              </Link>

              <button
                onClick={() => handleAddToCart(product._id)}
                className="flex-1 h-12 py-2 px-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md text-center flex items-center justify-center whitespace-nowrap"
                style={{ lineHeight: "1.5", fontSize: "14px" }}
              >
                {t("add_to_cart")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
