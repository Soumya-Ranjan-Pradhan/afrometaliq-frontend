"use client";

import { useProductById } from "@/api/product/queries/useProductQuery";
import ProductTabs from "@/Components/Product/ProductTabs";
import PageSkeleton from "@/Components/Skeleton/SingleProducts";
import { useAuthStore } from "@/store/auth";
import { useGlobalStore } from "@/store/global";
import React, { useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Slider */}
          <div className="w-full md:w-1/2">
            <div className="border rounded-lg overflow-hidden">
              <Slider {...sliderSettings}>
                {productDetails?.product_images?.map(
                  (image: any, index: number) => (
                    <div key={index}>
                      <Image
                        width={400}
                        height={300}
                        src={image.url}
                        alt={productDetails?.product_name || "Product Image"}
                      />
                    </div>
                  )
                )}
              </Slider>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-semibold text-gray-800">
              {productDetails?.product_name}
            </h1>

            <p className="mt-6 text-gray-600 text-sm leading-6">
              {productDetails?.product_description}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-red-500 text-2xl font-bold">
                {user?._id ? (
                  <span className="text-lg font-bold text-purple-600">
                    MZN {productDetails?.product_price}{" "}
                    <span className="text-red-600">
                      {productDetails?.product_discount}{" "}
                      <span className="text-red-600">%</span>
                    </span>{" "}
                    <span> MZN {productDetails?.product_selling_price}</span>
                  </span>
                ) : (
                  <p className="text-sm text-gray-500">
                    login to see the price
                  </p>
                )}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Available Sizes
              </h3>
              <div className="flex gap-4">
                {productDetails?.product_theme_size?.map((size: string) => (
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
                  className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white rounded-lg font-semibold hover:bg-red-600 transition"
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
