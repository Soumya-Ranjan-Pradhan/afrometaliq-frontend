"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const HomeBanner = () => {
  // Static image data with text
  const staticImages = [
    {
      url: "https://soumyaranjanpradhan.s3.amazonaws.com/WhatsApp+Image+2024-08-28+at+12.07.34+AM+1+(1).png",
      alt: "Banner 1",
      text: "Welcome to Our Store",
    },
    {
      url: "https://soumyaranjanpradhan.s3.amazonaws.com/WhatsApp+Image+2024-08-28+at+12.07.34+AM+1+(1).png",
      alt: "Banner 2",
      text: "Exclusive Offers",
      subText: "Don't miss out!",
    },
    {
      url: "https://soumyaranjanpradhan.s3.amazonaws.com/WhatsApp+Image+2024-08-28+at+12.07.34+AM+1+(1).png",
      alt: "Banner 3",
      text: "Shop the Latest Trends",
    },
  ];

  // Settings for react-slick
  const settings = {
    dots: true, // Enables pagination dots
    infinite: true, // Loops the slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Shows 1 slide at a time
    slidesToScroll: 1, // Scrolls 1 slide at a time
    autoplay: true, // Enables autoplay
    autoplaySpeed: 3500, // Autoplay delay
    arrows: false, // Hides navigation arrows (optional)
  };

  return (
    <div className="container mx-auto mt-3">
      <div className="homeBannerSection">
        <Slider {...settings}>
          {staticImages.map((image, index) => (
            <div key={index}>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                />
                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md mb-2">
                    {image.text}
                  </p>
                  {image.subText && (
                    <p className="text-white text-sm sm:text-lg md:text-xl bg-black bg-opacity-50 px-3 py-1 rounded-md">
                      {image.subText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;
