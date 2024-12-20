"use client";

import { useProductById } from "@/api/product/queries/useProductQuery";
import ProductTabs from "@/Components/Product/ProductTabs";
import PageSkeleton from "@/Components/Skeleton/SingleProducts";
import { useAuthStore } from "@/store/auth";
import { useGlobalStore } from "@/store/global";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaExchangeAlt } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";

const Page = ({ params }: { params: { id: string } }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);
  const user = useAuthStore((state) => state.user);

  const handleClick = () => {
    setComingSoon(true);
  };

  // Fetch product by ID
  const { data: product, isLoading, error } = useProductById(params.id);

  if (isLoading) return <PageSkeleton />;
  if (error) return <div>Error fetching product details</div>;

  const productDetails = product?.data.product;

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={
                  productDetails?.product_images[0]?.url || "/placeholder.jpg"
                }
                alt={productDetails?.product_name || "Product Image"}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-semibold text-gray-800">
              {productDetails?.product_name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-red-500 text-2xl font-bold">
                {user?._id ? (
                  <span className="text-lg font-bold text-purple-600">
                    ₹{productDetails?.product_selling_price}
                  </span>
                ) : (
                  <p className="text-sm text-gray-500">
                    login to see the price
                  </p>
                )}
              </span>
            </div>
            <p className="mt-6 text-gray-600 text-sm leading-6">
              {productDetails?.product_description}
            </p>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Available Sizes
              </h3>
              <div className="flex gap-4">
                {productDetails?.product_theme_size.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelection(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-800"
                    } hover:bg-green-600 hover:text-white transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 border-r bg-gray-100 hover:bg-gray-200 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center outline-none bg-white"
                />
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 border-l bg-gray-100 hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                <button
                  onClick={handleClick}
                  className="w-full lg:w-auto  px-6 py-3 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  <div className="flex items-center justify-center gap-2">
                    <MdShoppingCartCheckout size={20} color="white" />
                    <p>Add To Cart</p>
                  </div>
                </button>

                <button
                  onClick={handleClick}
                  className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={productDetails} />
    </>
  );
};

export default Page;
