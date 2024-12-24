"use client";

import React, { useRef } from "react";
import { Swiper as SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import { Swiper } from "swiper/types";
import { useProducts } from "@/api/product/queries/useProductQuery";
import Link from "next/link";
import { useGlobalStore } from "@/store/global";
import CarouselSkeleton from "@/Components/Skeleton/CarouselSkeleton";
import { useAuthStore } from "@/store/auth";

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

const NewArrivingProductCarousel: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const { data, isLoading, error } = useProducts({ discount: 1 });

  const user = useAuthStore((state) => state.user);

  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);

  const handleClick = () => {
    setComingSoon(true);
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselSkeleton key={index} />
        ))}
      </div>
    );
  if (error) return <div>Error fetching products</div>;

  return (
    <div className="mx-auto px-4">
      <h2 className="text-2xl text-center font-bold mt-8">Promotional Products</h2>
      <p className="text-gray-500 text-center mb-4">
        Do not miss the current offers until the end of Month.
      </p>

      <div className="relative">
        <SwiperClass
          spaceBetween={16}
          slidesPerView={1}
          onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="my-8"
        >
          {data?.data.products.map((product) => (
            <SwiperSlide key={product._id} id={product._id}>
              <div className="bg-white rounded-lg shadow-lg p-4 relative">
                <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                  Promotion
                </span>
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={product.product_images[0]?.url}
                    alt={product.product_name}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                </Link>

                <h3 className="text-lg font-semibold truncate">
                  {product.product_name}
                </h3>

                <div className="text-sm text-gray-500 mt-1">
                  {user?._id ? (
                    <span className="text-lg font-bold text-gray-700">
                      MZN {product.product_selling_price}{" "}
                      <span className="bg-blue-200 text-blue-600 text-sm font-bold px-2 py-1 rounded-full">
                        {product.product_discount}%
                      </span>
                    </span>
                  ) : (
                    <p className="text-sm text-gray-500">
                      login to see the price
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <span className="text-lg font-bold text-purple-600">
                    {user?._id ? (
                      <span className="text-lg line-through text-gray-500 font-bold">
                        MZN {product.product_price.toLocaleString()}
                      </span>
                    ) : (
                      <p className="text-sm text-gray-500">
                        login to see the price
                      </p>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handleClick}
                    className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
                  >
                    BUY NOW
                  </button>

                  <button
                    onClick={handleClick}
                    className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </SwiperClass>

        {/* Custom Rounded Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-gray-700 hover:bg-gray-100 transition-all focus:outline-none"
        >
          <BsChevronLeft size={24} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-gray-700 hover:bg-gray-100 transition-all focus:outline-none"
        >
          <BsChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default NewArrivingProductCarousel;
