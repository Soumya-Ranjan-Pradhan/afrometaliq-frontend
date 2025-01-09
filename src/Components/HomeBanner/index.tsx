"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useGetAllBanner } from "@/api/banner/queries/useBannerQuery";

const HomeBanner = () => {
  // Static image data with text
  const staticImages = [
    {
      url: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1728206574/v0kc4hdlkv8kg64clt2i.jpg",
      alt: "Banner 1",
      text: "Welcome to Our Store",
    },
    {
      url: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1728206574/v0kc4hdlkv8kg64clt2i.jpg",
      alt: "Banner 2",
      text: "Exclusive Offers",
      subText: "Don't miss out!",
    },
    {
      url: "https://res.cloudinary.com/datf6laqn/image/upload/v1728109843/deimh6vqhatwyjehc9nh.jpg",
      alt: "Banner 3",
      text: "Shop the Latest Trends",
    },
  ];

  const { data, isLoading, error } = useGetAllBanner();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching banners</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <div className="mx-auto">
      <div className="homeBannerSection">
        <Slider {...settings}>
          {data?.data.banners.map((banner: any, index) => (
            <div key={index}>
              {/* Ensure this div is relative */}
              <div className="relative w-full lg:h-[85vh] md:h-[40vh] sm:h-[70vh] h-[30vh]">
                {/* Image */}
                <Image
                  src={banner.banner_images[0]?.url}
                  alt={banner.banner_images[0]?.alt}
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                  priority={index === 0}
                />
                {/* Content for Steels */}
                {/* Animated Content */}
                <motion.div
                  className="absolute bottom-5 right-5 flex items-center gap-3 z-10"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <FaCheck className="text-2xl text-black" />
                  </div>
                  <div className="px-5 py-2 bg-[#605AC5BF] rounded-lg">
                    <p className="text-lg font-bold text-white">
                      {banner.banner_title}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;
