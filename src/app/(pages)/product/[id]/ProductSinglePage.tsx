"use client";

import ProductTabs from "@/Components/Product/ProductTabs";
import { useAuthStore } from "@/store/auth";
import React, { useState, useRef } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa";
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
import { PopulatedProduct } from "@/api/product/productApi";

const DEFAULT_IMAGE_URL =
  "https://res.cloudinary.com/dppfr1gjx/image/upload/v1743444584/a8166uxtah4aqkcndpvr.jpg";

const ProductSinglePage = ({
  id,
  product,
}: {
  id: string;
  product: PopulatedProduct;
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const user = useAuthStore((state) => state.user);
  //   const { data: product, isLoading, error } = useProductById(id);
  const { mutate: addToCart } = useAddToCartMutation();
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const { t } = useTranslation();
  // Extract product categories

  const categories = product?.category?.map((cat) => cat._id) || [];

  const handleAddToCart = (productId: string, redirectToCart = false) => {
    const token = getFromLS("accessToken");
  
    if (!token) {
      toast.warn("Please login before adding items to the cart.");
      router.push("/signin");
      return;
    }
  
    setLoadingIds((prev) => [...prev, productId]);
  
    addToCart(
      {
        productId,
        quantity: 1,
        ...(selectedSize && { size: selectedSize }), //! size is optional now
      },
      {
        onSuccess: () => {
          toast.success("Item added to cart successfully!");
          if (redirectToCart) {
            router.push("/cart");
          }
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
  
  //   if (isLoading) return <PageSkeleton />;
  //   if (error) return <div>Error fetching product details</div>;

  // const handleAddToCart = (
  //   productId: string,
  //   redirectToCart: boolean = false
  // ) => {
  //   const token = getFromLS("accessToken");

  //   if (!token) {
  //     toast.warn("Please login before adding items to the cart.");
  //     router.push("/signin");
  //     return;
  //   }

  //   if (!selectedSize) {
  //     toast.error("Please choose a size before proceeding.");
  //     return;
  //   }

  //   setLoadingIds((prev) => [...prev, productId]);

  //   addToCart(
  //     { productId, quantity: 1, size: selectedSize },
  //     {
  //       onSuccess: () => {
  //         toast.success("Item added to cart successfully!");
  //         if (redirectToCart) {
  //           router.push("/cart"); // ✅ Redirect only if it's Buy Now
  //         }
  //       },
  //       onError: () => {
  //         toast.error("Failed to add item to cart. Please try again.");
  //       },
  //       onSettled: () => {
  //         setLoadingIds((prev) => prev.filter((id) => id !== productId));
  //       },
  //     }
  //   );
  // };

  const productDetails = product;

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
                {productDetails?.product_images?.length ? (
                  productDetails.product_images.map(
                    (image: any, index: number) => (
                      <SwiperSlide key={index}>
                        <Image
                          width={400}
                          height={100}
                          src={image.url || DEFAULT_IMAGE_URL}
                          alt={productDetails?.product_name || "Product image"}
                          className="object-contain w-full h-[20rem]"
                        />
                      </SwiperSlide>
                    )
                  )
                ) : (
                  <SwiperSlide>
                    <Image
                      width={400}
                      height={100}
                      src={DEFAULT_IMAGE_URL}
                      alt="Default product image"
                      className="object-contain w-full h-[20rem]"
                    />
                  </SwiperSlide>
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
            <div className="w-full items-center  p-2 overflow-hidden">
              <div className="border h-[5rem] flex items-center p-2 rounded-lg overflow-hidden relative">
                <h1>
                  {productDetails?.product_add_description || "no description"}
                </h1>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-lg font-semibold text-gray-800">
              {productDetails?.product_name}
            </h1>

            <p className=" text-gray-600 text-sm leading-6">
              {productDetails?.product_description}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-red-500 text-2xl font-bold">
                {user?._id ? (
                  <span className="text-lg font-bold text-purple-600">
                    {/* Show Original Price and Discount only if discount > 0 */}
                    {productDetails?.product_discount &&
                    productDetails?.product_discount > 0 ? (
                      <>
                        <span className="line-through text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                          MZN {productDetails?.product_price?.toFixed(2)}
                        </span>{" "}
                        <span className="text-red-600">
                          {productDetails?.product_discount}% OFF
                        </span>
                      </>
                    ) : null}

                    {/* Selling Price Always Shown */}
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                      MZN {productDetails?.product_selling_price}
                    </span>
                  </span>
                ) : (
                  <p className="text-[10px] text-red-500">
                    {t("login_to_price")}
                  </p>
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
                    {size || "NA"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row items-center gap-4">
              {/* Buttons */}
              <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                <button
                   onClick={() => handleAddToCart(productDetails?._id || "", true)}
                  className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  <div className="flex items-center justify-center gap-2">
                    {loadingIds.includes(productDetails?._id || "") ? (
                      <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin text-white text-lg" />
                      </div>
                    ) : (
                      t("add_to_cart")
                    )}
                    <MdShoppingCartCheckout size={25} color="white" />
                  </div>
                </button>

                <Link
                   onClick={() => handleAddToCart(productDetails?._id || "")}
                  href={`/cart`}
                  className="lg:flex-1 md:w-full w-full h-12 py-2 px-4 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md text-center flex items-center justify-center whitespace-nowrap"
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

export default ProductSinglePage;
