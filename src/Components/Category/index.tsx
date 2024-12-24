"use client";
import { useCategoriesByLevel } from "@/api/category/queries/useCategoryQuery";
import Image from "next/image";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import CategorySkeleton from "../Skeleton/CategorySkeleton";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Category: React.FC = () => {
  const { data, isLoading, isError } = useCategoriesByLevel({ level: 1 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false); // Pause auto-scroll when hovered

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isPaused) return;

    let scrollAmount = scrollContainer.scrollLeft; // Start from current scroll position
    const scrollSpeed = 2; // Speed of auto-scroll

    const scrollStep = () => {
      if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) return;

      scrollAmount += scrollSpeed;

      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0; // Reset scroll
      }

      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    const interval = setInterval(scrollStep, 30); // Adjust for smoothness
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [isPaused]);

  return (
    <div className="py-8">
      <div className="flex justify-center my-10 items-center gap-2 mt-4">
        <FaLongArrowAltLeft
          size={20}
          color="green"
          className=" ml-2 animate-move-left"
        />
        <div className="text-green-600 font-extrabold text-center">
          <h2 className="text-center text-3xl md:text-3xl font-xeroda font-bold">
            Category
          </h2>
        </div>
        <FaLongArrowAltRight
          size={20}
          color="green"
          className=" ml-2 animate-move-left"
        />
      </div>

      <motion.div
        ref={scrollContainerRef}
        className="overflow-x-auto flex space-x-6 px-6 hide-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsPaused(true)} // Pause auto-scroll on hover
        onMouseLeave={() => setIsPaused(false)} // Resume auto-scroll on leave
      >
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))
        ) : isError ? (
          <p>Error fetching categories</p>
        ) : (
          data?.data.categories.map((category) => (
            <motion.div
              key={category._id}
              className="flex-shrink-0 py-6 text-center w-28 md:w-32 lg:w-48"
              variants={itemVariants}
            >
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-44 lg:h-44 rounded-full border-4 border-[#5A43AF] flex items-center justify-center mx-auto transition-all duration-300 ease-in-out hover:border-[#7F5FE3] hover:scale-125">
                <div className="relative w-full h-full overflow-hidden rounded-full">
                  <Image
                    src={
                      category?.thumbnail
                        ? category.thumbnail.url
                        : "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png"
                    }
                    alt={category.category_name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>

              <p className="mt-5 text-sm md:text-lg lg:text-2xl font-medium">
                {category.category_name}
              </p>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Category;
