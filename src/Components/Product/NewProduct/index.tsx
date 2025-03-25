"use client";

import React, { useRef, useState } from "react";
import { Swiper as SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import { Swiper } from "swiper/types";
import { useProducts } from "@/api/product/queries/useProductQuery";
import Link from "next/link";
import CarouselSkeleton from "@/Components/Skeleton/CarouselSkeleton";
import { useAuthStore } from "@/store/auth";
import { FaShareAlt, FaSpinner, FaCopy } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAddToCartMutation } from "@/api/cart/query/useCartQuery";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinIcon,
} from "react-share";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getFromLS } from "@/lib/storage";
import { MdShoppingCartCheckout } from "react-icons/md";

const NewArrivingProductCarousel: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const { data, isLoading, error } = useProducts({ discount: 1 });
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const { mutate: addToCart } = useAddToCartMutation();
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [shareProduct, setShareProduct] = useState<string | null>(null);
  const router = useRouter();

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

  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselSkeleton key={index} />
        ))}
      </div>
    );

  if (error) return <div>Error fetching products</div>;

  return (
    <div className="mx-auto px-4">
      <h2 className="text-2xl text-center font-bold mt-8">{t("products")}</h2>
      <p className="text-gray-500 text-center mb-4">{t("product_title")}</p>

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
            1024: { slidesPerView: 5 },
          }}
          className="my-8"
        >
          {data?.data.products.map((product) => {
            const productUrl = `https://www.afrometaliq.com/product/${product._id}`;
            return (
              <SwiperSlide key={product._id} id={product._id}>
                <div className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500">
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                    {t("promotions")}
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

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() =>
                        setShareProduct(
                          shareProduct === productUrl ? null : productUrl
                        )
                      }
                      className="absolute top-6 right-6 p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300"
                    >
                      <FaShareAlt className="text-black hover:text-white h-6 w-6" />
                    </button>
                  </div>

                  <div className="mt-4 pb-[6rem] relative">
                    <h3 className="text-[12px] font-semibold text-gray-800">
                      {product.product_name}
                    </h3>
                    <div className="text-lg font-bold text-purple-600">
                      {user?._id ? (
                        <>
                          <span className="text-sm font-bold text-gray-700">
                            MZN {product.product_selling_price} Sale
                          </span>
                          <span className="bg-blue-200 mx-2 text-blue-600 text-sm font-bold px-2 py-1 rounded-full">
                            {product.product_discount}%
                          </span>

                          <p className="text-sm font-bold line-through text-gray-500">
                            MZN {product.product_price} Sale
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-red-500 md:mb-4">
                          {t("login_to_price")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4  right-4 space-y-1">
                    <Link
                      href={`/buynow/${product._id}`}
                      className="w-full py-2  flex items-center justify-center bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md"
                    >
                      {t("buy_now")}
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="w-full py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md flex items-center justify-center"
                      disabled={loadingIds.includes(product._id)}
                    >
                      {/* {loadingIds.includes(product._id) ? (
                        <div className="flex items-center justify-center">
                          <FaSpinner className="animate-spin text-white text-lg" />
                        </div>
                      ) : (
                        t("add_to_cart")
                      )} */}

                      <div className="flex items-center justify-center gap-2">
                        {loadingIds.includes(product?._id || "") ? (
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
                  {shareProduct === productUrl && (
                    <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4 z-50">
                      <div className="flex space-x-4">
                        <FacebookShareButton url={productUrl}>
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={productUrl}>
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton url={productUrl}>
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <TelegramShareButton url={productUrl}>
                          <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <LinkedinShareButton url={productUrl}>
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <button
                          onClick={() => handleCopyToClipboard(productUrl)}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300"
                        >
                          <FaCopy size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperClass>

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

// "use client";

// import React, { useRef } from "react";
// import { Swiper as SwiperClass, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Pagination } from "swiper/modules";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
// import Image from "next/image";
// import { Swiper } from "swiper/types";
// import { useProducts } from "@/api/product/queries/useProductQuery";
// import Link from "next/link";
// import { useGlobalStore } from "@/store/global";
// import CarouselSkeleton from "@/Components/Skeleton/CarouselSkeleton";
// import { useAuthStore } from "@/store/auth";
// import { FaShareAlt } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   originalPrice: number;
//   salesCount: number;
//   imageUrl: string;
//   stock: string;
//   rating: number;
//   description: string;
// };

// const NewArrivingProductCarousel: React.FC = () => {
//   const swiperRef = useRef<Swiper | null>(null);
//   const { data, isLoading, error } = useProducts({ discount: 1 });
//   const { t } = useTranslation();

//   const user = useAuthStore((state) => state.user);

//   const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);

//   const handleClick = () => {
//     setComingSoon(true);
//   };

//   if (isLoading)
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {Array.from({ length: 8 }).map((_, index) => (
//           <CarouselSkeleton key={index} />
//         ))}
//       </div>
//     );
//   if (error) return <div>Error fetching products</div>;

//   return (
//     <div className="mx-auto px-4">
//       <h2 className="text-2xl text-center font-bold mt-8">{t("products")}</h2>
//       <p className="text-gray-500 text-center mb-4">{t("product_title")}</p>

//       <div className="relative">
//         <SwiperClass
//           spaceBetween={16}
//           slidesPerView={1}
//           onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)}
//           pagination={{ clickable: true }}
//           modules={[Pagination]}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 },
//           }}
//           className="my-8"
//         >
//           {data?.data.products.map((product) => (
//             <SwiperSlide key={product._id} id={product._id}>
//               <div className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500">
//                 <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
//                   {t("promotions")}
//                 </span>
//                 <Link href={`/product/${product._id}`}>
//                   <Image
//                     src={product.product_images[0]?.url}
//                     alt={product.product_name}
//                     width={500}
//                     height={500}
//                     className="w-full h-48 object-cover rounded-md mb-4"
//                   />
//                 </Link>

//                 {/* Icons to show on hover */}
//                 <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <button
//                     // onClick={() => openModal(product)}
//                     className="absolute top-6 right-6 p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300"
//                   >
//                     <FaShareAlt className="text-black hover:text-white h-6 w-6" />
//                   </button>
//                 </div>

//                 <h3 className="text-lg font-semibold truncate">
//                   {product.product_name}
//                 </h3>

//                 <div className="text-sm text-gray-500 mt-1">
//                   {user?._id ? (
//                     <span className="text-lg font-bold text-gray-700">
//                       MZN {product.product_selling_price}{" "}
//                       <span className="bg-blue-200 text-blue-600 text-sm font-bold px-2 py-1 rounded-full">
//                         {product.product_discount}%
//                       </span>
//                     </span>
//                   ) : (
//                     <p className="text-sm text-red-500">
//                       {t("login_to_price")}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex items-center">
//                   <span className="text-lg font-bold text-purple-600">
//                     {user?._id ? (
//                       <span className="text-lg line-through text-gray-500 font-bold">
//                         MZN {product.product_price.toLocaleString()}
//                       </span>
//                     ) : (
//                       <p className="text-sm text-red-500">
//                         {t("login_to_price")}
//                       </p>
//                     )}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-2 mt-4">
//                   <Link
//                     href={`/buynow/${product._id}`}
//                     className="flex-1 h-12 py-2 px-4 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md text-center flex items-center justify-center whitespace-nowrap"
//                     style={{ lineHeight: "1.5", fontSize: "14px" }}
//                   >
//                     {t("buy_now")}
//                   </Link>

//                   <button
//                     onClick={handleClick}
//                     className="flex-1 h-12 py-2 px-4 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md text-center flex items-center justify-center whitespace-nowrap"
//                     style={{ lineHeight: "1.5", fontSize: "14px" }}
//                   >
//                     {t("add_to_cart")}
//                   </button>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </SwiperClass>

//         {/* Custom Rounded Navigation Buttons */}
//         <button
//           onClick={() => swiperRef.current?.slidePrev()}
//           className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-gray-700 hover:bg-gray-100 transition-all focus:outline-none"
//         >
//           <BsChevronLeft size={24} />
//         </button>
//         <button
//           onClick={() => swiperRef.current?.slideNext()}
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-gray-700 hover:bg-gray-100 transition-all focus:outline-none"
//         >
//           <BsChevronRight size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewArrivingProductCarousel;
