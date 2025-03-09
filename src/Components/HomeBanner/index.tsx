"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useGetAllBanner } from "@/api/banner/queries/useBannerQuery";
import BannerSkeleton from "@/Components/Skeleton/BannerSkeleton";

const HomeBanner = () => {
  const { data, isLoading, error } = useGetAllBanner();

  if (isLoading)
    return (
      <div className="mx-auto">
        <div className="homeBannerSection">
          <Slider
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3500}
            arrows={false}
          >
            {[...Array(3)].map((_, index) => (
              <BannerSkeleton key={index} />
            ))}
          </Slider>
        </div>
      </div>
    );

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
              <div className="relative w-full lg:h-[85vh] md:h-[40vh] sm:h-[70vh] h-[30vh]">
                <Image
                  src={banner.banner_images[0]?.url}
                  alt={banner.banner_images[0]?.alt || "Banner Image"}
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                  priority={index === 0}
                />
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
                  <div className="px-5 py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] rounded-lg">
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
