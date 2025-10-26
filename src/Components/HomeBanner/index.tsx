"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGetAllBanner } from "@/api/banner/queries/useBannerQuery";

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

  // 🛠️ FIX: use `banner_image` instead of `banner_images`
  const transformedSlides: Slide[] = (data?.data?.banners || []).map(
    (banner, index) => ({
      id: index,
      image: banner.banner_image?.url || "", // <-- FIXED HERE
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
      <div className="h-[500px] flex justify-center items-center">
        Loading banners...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full h-[500px] md:h-[600px] lg:h-screen flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full h-[500px] md:h-[600px] lg:h-screen",
          containerClassName
        )}
      >
        {currentSlides.length > 0 && (
          <>
            <div className="relative w-full h-full">
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
                  className="absolute inset-0 w-full h-full"
                >
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentSlides[0].image})`,
                    }}
                  >
                    <motion.div
                      className="absolute top-1/2 left-4 sm:left-8 md:left-16 transform -translate-y-1/2 w-72 text-left text-white"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h2
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl font-bold uppercase"
                      >
                        {currentSlides[0].name}
                      </motion.h2>
                      <motion.p
                        variants={itemVariants}
                        className="mt-3 mb-6 text-sm sm:text-base text-gray-100"
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
                onClick={() => handleNavigation("prev")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {prevButtonContent || (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
