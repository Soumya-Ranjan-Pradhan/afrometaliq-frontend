"use client";

import {
  useProductById,
  useRelatedProducts,
} from "@/api/product/queries/useProductQuery";
import ProductTabs from "@/Components/Product/ProductTabs";
import PageSkeleton from "@/Components/Skeleton/SingleProducts";
import { useAuthStore } from "@/store/auth";
import React, { useState, useRef } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import SpecificationsTabMobile from "@/Components/Product/ProductTabs/MobileProductTab";
import { useAddToCartMutation } from "@/api/cart/query/useCartQuery";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import RelatedProduct from "@/Components/AllProduct/RelatedProduct";
import { getFromLS } from "@/lib/storage";

const Page = ({ params }: { params: { id: string } }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const user = useAuthStore((state) => state.user);
  const { data: product, isLoading, error } = useProductById(params.id);
  const { mutate: addToCart } = useAddToCartMutation();
  const { t } = useTranslation();
  // Extract product categories
  const categories = product?.data.product.category.map((cat) => cat._id) || [];

  const handleAddToCart = (productId: string) => {
    const token = getFromLS("accessToken");
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

  if (isLoading) return <PageSkeleton />;
  if (error) return <div>Error fetching product details</div>;

  const productDetails = product?.data.product;

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <>
      <div className=" px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Slider */}
          <div className="w-full md:w-1/2">
            <div className="border rounded-lg overflow-hidden relative">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="product-swiper"
              >
                {productDetails?.product_images?.map(
                  (image: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Image
                        width={400}
                        height={100}
                        src={image.url}
                        alt={productDetails?.product_name || "Product Image"}
                        className="object-contain w-full h-[30rem]"
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
              {/* Custom Navigation Buttons */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-semibold text-gray-800">
              {productDetails?.product_name}
            </h1>

            <p className=" text-gray-600 text-sm leading-6">
              {productDetails?.product_description}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-red-500 text-2xl font-bold">
                {user?._id ? (
                  <span className="text-lg font-bold text-purple-600">
                    <span className="line-through text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      MZN {productDetails?.product_price}
                    </span>{" "}
                    <span className="text-red-600">
                      {productDetails?.product_discount}%
                    </span>{" "}
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                      MZN {productDetails?.product_selling_price}
                    </span>
                  </span>
                ) : (
                  <p className="text-sm text-red-500">{t("login_to_price")}</p>
                )}
              </span>
            </div>

            <div className="mt-2">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t("available_size")}
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
              {/* Buttons */}
              <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                <button
                  onClick={() => handleAddToCart(productDetails?._id || "")}
                  className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  <div className="flex items-center justify-center gap-2">
                    <MdShoppingCartCheckout
                      size={20}
                      color="white"
                      // onClick={() => handleAddToCart(productDetails?._id || "")}
                    />
                    <p> {t("add_to_cart")}</p>
                  </div>
                </button>

                <Link
                  href={`/buynow/${productDetails?._id}`}
                  className="lg:flex-1 md:w-full w-full h-12 py-2 px-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md text-center flex items-center justify-center whitespace-nowrap"
                  style={{ lineHeight: "1.5", fontSize: "14px" }}
                >
                  {t("buy_now")}
                </Link>
              </div>
            </div>

            {/* For large Screen and sm screen  */}
            <ProductTabs product={productDetails} />
          </div>
        </div>
      </div>

      <SpecificationsTabMobile product={productDetails} />

      {/* Fetch the Related product */}
      <RelatedProduct categories={categories} />
    </>
  );
};

export default Page;
