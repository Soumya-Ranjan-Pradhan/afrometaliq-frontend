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
      url: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1728207790/jrhw74p8ps7kaylycdek.jpg",
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
    <div className=" mx-auto ">
      <div className="homeBannerSection">
        <Slider {...settings}>
          {staticImages.map((image, index) => (
            <div key={index}>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;
