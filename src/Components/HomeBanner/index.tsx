"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGetAllBanner } from "@/api/banner/queries/useBannerQuery";

// Slide interface for UI
interface Slide {
  id: number;
  image: string;
  name: string;
  description: string;
}

interface ImageSliderProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  onSeeMore?: (slide: Slide) => void;
  prevButtonContent?: React.ReactNode;
  nextButtonContent?: React.ReactNode;
  thumbnailCount?: number;
}

const HomeBanner: React.FC<ImageSliderProps> = ({
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
  containerClassName,
  buttonClassName,
  onSeeMore,
  prevButtonContent,
  nextButtonContent,
  thumbnailCount = 3,
}) => {
  const { data, isLoading } = useGetAllBanner();
  const transformedSlides: Slide[] = (data?.data?.banners || []).map(
    (banner, index) => ({
      id: index,
      image: banner.banner_images?.[0]?.url || "",
      name: banner.banner_title,
      description: "",
    })
  );

  const [currentSlides, setSlides] = useState<Slide[]>([]);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setAutoPlay] = useState(autoPlay);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (transformedSlides.length > 0) {
      setSlides(transformedSlides);
    }
  }, [data]);

  const nextSlide = () => {
    setDirection(1);
    setSlides((prev) => {
      const newSlides = [...prev];
      const firstSlide = newSlides.shift();
      if (firstSlide) newSlides.push(firstSlide);
      return newSlides;
    });
    setActiveIndex((prevIndex) => (prevIndex + 1) % transformedSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSlides((prev) => {
      const newSlides = [...prev];
      const lastSlide = newSlides.pop();
      if (lastSlide) newSlides.unshift(lastSlide);
      return newSlides;
    });
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? transformedSlides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;

    const direction = index > activeIndex ? 1 : -1;
    setDirection(direction);
    let currentIndex = activeIndex;
    const newSlides = [...currentSlides];

    if (direction > 0) {
      while (currentIndex !== index) {
        const firstSlide = newSlides.shift();
        if (firstSlide) newSlides.push(firstSlide);
        currentIndex = (currentIndex + 1) % transformedSlides.length;
      }
    } else {
      while (currentIndex !== index) {
        const lastSlide = newSlides.pop();
        if (lastSlide) newSlides.unshift(lastSlide);
        currentIndex =
          currentIndex === 0 ? transformedSlides.length - 1 : currentIndex - 1;
      }
    }

    setSlides(newSlides);
    setActiveIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(autoPlay), 10000);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isAutoPlay && currentSlides.length > 0) {
      timer = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, autoPlayInterval, currentSlides]);

  const handleNavigation = (dir: string) => {
    setAutoPlay(false);
    if (dir === "next") nextSlide();
    else prevSlide();
    setTimeout(() => setAutoPlay(autoPlay), 10000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 100, filter: "blur(20px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const indicatorVariants = {
    inactive: { scale: 1, opacity: 0.5 },
    active: {
      scale: 1.3,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    hover: { scale: 1.5 },
  };

  if (isLoading) {
    return (
      <div className="h-96 flex justify-center items-center">
        Loading banners...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full h-96 lg:h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className={cn("relative w-full h-screen md:h-full", containerClassName)}
      >
        {currentSlides.length > 0 && (
          <>
            <div className="w-full h-screen">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentSlides[0].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.8 },
                  }}
                  className="absolute w-full h-full"
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentSlides[0].image})`,
                    }}
                  >
                    <motion.div
                      className="absolute top-1/2 left-16 transform -translate-y-1/2 w-72 text-left text-white"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold uppercase"
                      >
                        {currentSlides[0].name}
                      </motion.h2>
                      <motion.p
                        variants={itemVariants}
                        className="mt-3 mb-6 text-gray-100"
                      >
                        {currentSlides[0].description}
                      </motion.p>
                      <motion.button
                        variants={itemVariants}
                        className={cn(
                          "px-6 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors font-medium",
                          buttonClassName
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSeeMore?.(currentSlides[0])}
                      >
                        See More
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden md:block">
              {currentSlides
                .slice(1, thumbnailCount + 1)
                .map((slide, index) => (
                  <motion.div
                    key={slide.id}
                    className={cn(
                      "w-40 h-24 rounded-lg overflow-hidden shadow-lg m-3 cursor-pointer",
                      buttonClassName
                    )}
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.8 - index * 0.2,
                    }}
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const targetIndex =
                        (activeIndex + index + 1) % transformedSlides.length;
                      goToSlide(targetIndex);
                    }}
                  />
                ))}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-6 w-full flex justify-center space-x-4">
              <motion.button
                className="text-white"
                // className="px-2 py-1 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium"
                onClick={() => handleNavigation("prev")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {prevButtonContent || (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </motion.button>
              <motion.button
                className="text-white"
                onClick={() => handleNavigation("next")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {nextButtonContent || (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-1 w-full flex justify-center">
              <div className="flex space-x-3">
                {transformedSlides.map((_, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full bg-white cursor-pointer",
                      buttonClassName
                    )}
                    style={{ opacity: index === activeIndex ? 1 : 0.5 }}
                    variants={indicatorVariants}
                    animate={index === activeIndex ? "active" : "inactive"}
                    whileHover="hover"
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeBanner;

// "use client";
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
// import { FaCheck } from "react-icons/fa6";
// import { motion } from "framer-motion";
// import { useGetAllBanner } from "@/api/banner/queries/useBannerQuery";
// import BannerSkeleton from "@/Components/Skeleton/BannerSkeleton";

// const HomeBanner = () => {
//   const { data, isLoading, error } = useGetAllBanner();

//   if (isLoading)
//     return (
//       <div className="mx-auto">
//         <div className="homeBannerSection">
//           <Slider
//             dots={false}
//             infinite={true}
//             speed={500}
//             slidesToShow={1}
//             slidesToScroll={1}
//             autoplay={true}
//             autoplaySpeed={3500}
//             arrows={false}
//           >
//             {[...Array(3)].map((_, index) => (
//               <BannerSkeleton key={index} />
//             ))}
//           </Slider>
//         </div>
//       </div>
//     );

//   if (error) return <div>Error fetching banners</div>;

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3500,
//     arrows: false,
//   };

//   return (
//     <div className="mx-auto">
//       <div className="homeBannerSection">
//         <Slider {...settings}>
//           {data?.data.banners.map((banner: any, index) => (
//             <div key={index}>
//               <div className="relative w-full lg:h-[85vh] md:h-[40vh] sm:h-[70vh] h-[30vh]">
//                 <Image
//                   src={banner.banner_images[0]?.url}
//                   alt={banner.banner_images[0]?.alt || "Banner Image"}
//                   width="0"
//                   height="0"
//                   sizes="100vw"
//                   style={{ width: "100%", height: "100%" }}
//                   priority={index === 0}
//                 />
//                 <motion.div
//                   className="absolute bottom-5 right-5 flex items-center gap-3 z-10"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{
//                     duration: 0.8,
//                     delay: 0.5,
//                     ease: "easeOut",
//                   }}
//                 >
//                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
//                     <FaCheck className="text-2xl text-black" />
//                   </div>
//                   <div className="px-5 py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] rounded-lg">
//                     <p className="text-lg font-bold text-white">
//                       {banner.banner_title}
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default HomeBanner;

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { useGetAllBanner } from "@/api/banner/queries/useBannerQuery";

// // Define slide interface
// interface Slide {
//   id: number;
//   image: string;
//   name: string;
//   description: string;
// }

// // Define prop types
// interface ImageSliderProps {
//   slides?: Slide[];
//   autoPlay?: boolean;
//   autoPlayInterval?: number;
//   className?: string;
//   containerClassName?: string;
//   buttonClassName?: string;
//   onSeeMore?: (slide: Slide) => void;
//   prevButtonContent?: React.ReactNode;
//   nextButtonContent?: React.ReactNode;
//   thumbnailCount?: number;
// }

// // Default slides if none are provided
// const defaultSlides: Slide[] = [
//   {
//     id: 1,
//     image:
//       "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Switzerland",
//     description:
//       "Renowned for its breathtaking Alpine scenery and precision in craftsmanship",
//   },
//   {
//     id: 2,
//     image:
//       "https://images.unsplash.com/photo-1482784160316-6eb046863ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Finland",
//     description: "Known for its saunas, lakes, and a deep connection to nature",
//   },
//   {
//     id: 3,
//     image:
//       "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "India",
//     description:
//       "Famous for its rich culture, historical landmarks, natural beauty, and diverse cuisine",
//   },
//   {
//     id: 4,
//     image:
//       "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Australia",
//     description:
//       "Distinguished by its diverse ecosystems, ranging from beaches to bushland",
//   },
//   {
//     id: 5,
//     image:
//       "https://images.unsplash.com/photo-1482784160316-6eb046863ece?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Netherlands",
//     description:
//       "Characterized by its iconic canals, tulip fields, and windmills",
//   },
//   {
//     id: 6,
//     image:
//       "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Ireland",
//     description:
//       "Known for its lush green landscapes and rich cultural heritage",
//   },
// ];

// const HomeBanner: React.FC<ImageSliderProps> = ({
//   slides = defaultSlides,
//   autoPlay = true,
//   autoPlayInterval = 5000,
//   className,
//   containerClassName,
//   buttonClassName,
//   onSeeMore,
//   prevButtonContent,
//   nextButtonContent,
//   thumbnailCount = 3,
// }) => {
//   const [currentSlides, setSlides] = useState(slides);
//   const [direction, setDirection] = useState(0);
//   const [isAutoPlay, setAutoPlay] = useState(autoPlay);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const { data, isLoading, error } = useGetAllBanner();

//   const nextSlide = () => {
//     setDirection(1);
//     setSlides((prev) => {
//       const newSlides = [...prev];
//       const firstSlide = newSlides.shift();
//       if (firstSlide) newSlides.push(firstSlide);
//       return newSlides;
//     });
//     setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setDirection(-1);
//     setSlides((prev) => {
//       const newSlides = [...prev];
//       const lastSlide = newSlides.pop();
//       if (lastSlide) newSlides.unshift(lastSlide);
//       return newSlides;
//     });
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   const goToSlide = (index: number) => {
//     if (index === activeIndex) return;

//     const direction = index > activeIndex ? 1 : -1;
//     setDirection(direction);

//     let currentIndex = activeIndex;
//     const newSlides = [...currentSlides];

//     if (direction > 0) {
//       while (currentIndex !== index) {
//         const firstSlide = newSlides.shift();
//         if (firstSlide) newSlides.push(firstSlide);
//         currentIndex = (currentIndex + 1) % slides.length;
//       }
//     } else {
//       while (currentIndex !== index) {
//         const lastSlide = newSlides.pop();
//         if (lastSlide) newSlides.unshift(lastSlide);
//         currentIndex =
//           currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
//       }
//     }

//     setSlides(newSlides);
//     setActiveIndex(index);
//     setAutoPlay(false);
//     setTimeout(() => setAutoPlay(autoPlay), 10000);
//   };

//   useEffect(() => {
//     let timer: ReturnType<typeof setInterval>;
//     if (isAutoPlay) {
//       timer = setInterval(() => {
//         nextSlide();
//       }, autoPlayInterval);
//     }
//     return () => clearInterval(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAutoPlay, autoPlayInterval]);

//   const handleNavigation = (dir: string) => {
//     setAutoPlay(false);
//     if (dir === "next") nextSlide();
//     else prevSlide();
//     setTimeout(() => setAutoPlay(autoPlay), 10000);
//   };

//   // Animation variants
//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction: number) => ({
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//   };

//   const contentVariants = {
//     hidden: {
//       opacity: 0,
//       y: 100,
//       filter: "blur(20px)",
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: {
//         duration: 0.7,
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const indicatorVariants = {
//     inactive: { scale: 1, opacity: 0.5 },
//     active: {
//       scale: 1.3,
//       opacity: 1,
//       transition: { duration: 0.3 },
//     },
//     hover: { scale: 1.5 },
//   };

//   return (
//     <div
//       className={cn(
//         "w-full h-96 lg:h-screen flex items-center justify-center overflow-hidden",
//         className
//       )}
//     >
//       <div
//         className={cn(
//           "relative w-full h-screen md:h-full  md:mx-h-96 ",
//           containerClassName
//         )}
//       >
//         {/* Main slider */}
//         <div className=" w-full h-screen  ">
//           <AnimatePresence initial={false} custom={direction}>
//             <motion.div
//               key={currentSlides[0].id}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.8 },
//               }}
//               className="absolute w-full h-full"
//             >
//               <div
//                 className="w-full h-full bg-cover bg-center rounded-lg"
//                 style={{
//                   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentSlides[0].image})`,
//                 }}
//               >
//                 <motion.div
//                   className="absolute top-1/2 left-16 transform -translate-y-1/2 w-72 text-left text-white"
//                   variants={contentVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <motion.h2
//                     variants={itemVariants}
//                     className="text-4xl font-bold uppercase"
//                   >
//                     {currentSlides[0].name}
//                   </motion.h2>
//                   <motion.p
//                     variants={itemVariants}
//                     className="mt-3 mb-6 text-gray-100"
//                   >
//                     {currentSlides[0].description}
//                   </motion.p>
//                   <motion.button
//                     variants={itemVariants}
//                     className={cn(
//                       "px-6 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors font-medium",
//                       buttonClassName
//                     )}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => onSeeMore?.(currentSlides[0])}
//                   >
//                     See More
//                   </motion.button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Side thumbnails */}
//         <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden md:block">
//           {currentSlides.slice(1, thumbnailCount + 1).map((slide, index) => (
//             <motion.div
//               key={slide.id}
//               className={cn(
//                 "w-40 h-24 rounded-lg overflow-hidden shadow-lg m-3 cursor-pointer",
//                 buttonClassName
//               )}
//               style={{
//                 x: 50 + index * 15,
//                 backgroundImage: `url(${slide.image})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 opacity: 0.8 - index * 0.2,
//               }}
//               whileHover={{ scale: 1.05, opacity: 1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 const targetIndex = (activeIndex + index + 1) % slides.length;
//                 goToSlide(targetIndex);
//               }}
//             />
//           ))}
//         </div>

//         {/* Navigation buttons */}
//         <div className="absolute bottom-6 w-full flex justify-center space-x-4">
//           <motion.button
//             onClick={() => handleNavigation("prev")}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {prevButtonContent || (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             )}
//           </motion.button>
//           <motion.button
//             onClick={() => handleNavigation("next")}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {nextButtonContent || (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 className="lucide lucide-chevron-right-icon lucide-chevron-right text-back"
//               >
//                 <path d="m9 18 6-6-6-6" />
//               </svg>
//             )}
//           </motion.button>
//         </div>

//         {/* Pagination dots */}
//         <div className="absolute bottom-1 w-full flex justify-center">
//           <div className="flex space-x-3">
//             {slides.map((_, index) => (
//               <motion.div
//                 key={index}
//                 className={cn(
//                   "w-3 h-3 rounded-full bg-white cursor-pointer",
//                   buttonClassName
//                 )}
//                 style={{ opacity: index === activeIndex ? 1 : 0.5 }}
//                 variants={indicatorVariants}
//                 animate={index === activeIndex ? "active" : "inactive"}
//                 whileHover="hover"
//                 onClick={() => goToSlide(index)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeBanner;
