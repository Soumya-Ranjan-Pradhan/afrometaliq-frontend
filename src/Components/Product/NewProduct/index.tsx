"use client";

import React, { useRef } from "react";
import { Swiper as SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import {
  BsStarFill,
  BsStar,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import Image from "next/image";
import { Swiper } from "swiper/types";

type Product = {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  discount: number;
  image: string;
  inStock: boolean;
  rating: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "GESPO Peach Solid Ma...",
    price: 2000,
    discountedPrice: 1500,
    discount: 9,
    image:
      "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    inStock: true,
    rating: 5,
  },
  {
    id: 2,
    name: "Deel Band Women Rayo...",
    price: 1800,
    discountedPrice: 1500,
    discount: 12,
    image:
      "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    inStock: true,
    rating: 5,
  },
  {
    id: 3,
    name: "Deel Band Women Rayo...",
    price: 1800,
    discountedPrice: 1500,
    discount: 12,
    image:
      "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    inStock: true,
    rating: 5,
  },
  {
    id: 4,
    name: "Deel Band Women Rayo...",
    price: 1800,
    discountedPrice: 1500,
    discount: 12,
    image:
      "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    inStock: true,
    rating: 5,
  },
  {
    id: 5,
    name: "Deel Band Women Rayo...",
    price: 1800,
    discountedPrice: 1500,
    discount: 12,
    image:
      "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    inStock: true,
    rating: 5,
  },
  {
    id: 6,
    name: "Deel Band Women Rayo...",
    price: 1800,
    discountedPrice: 1500,
    discount: 12,
    image:
      "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    inStock: true,
    rating: 5,
  },
  // Add other products as needed
];

const NewArrivingProductCarousel: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);

  return (
    <div className="mx-auto px-4">
      <h2 className="text-2xl font-bold mt-8">Promotional Products</h2>
      <p className="text-gray-500 mb-4">
        Do not miss the current offers until the end of March.
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-lg shadow-lg p-4 relative">
                <span className="absolute top-2 left-2 bg-blue-200 text-blue-600 text-sm font-bold px-2 py-1 rounded-full">
                  {product.discount}%
                </span>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold truncate">
                  {product.name}
                </h3>
                <p
                  className={`text-green-600 font-semibold ${
                    product.inStock ? "" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
                <div className="flex items-center">
                  <span className="line-through text-gray-500 mr-2">
                    Rs {product.price}
                  </span>
                  <span className="text-red-600 font-bold">
                    Rs {product.discountedPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md">
                    BUY NOW
                  </button>

                  <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md">
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
