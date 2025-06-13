"use client";

import { useAllTestimonials } from "@/api/testimonials/queries/useTestimonialsQuery";
import TestimonialFormModal from "./TestimonialFormModal";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Testimonial = {
  name: string;
  quote: string;
  designation: string;
  src: string;
};

const TestimonialSlider = ({ autoplay = false }: { autoplay?: boolean }) => {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useAllTestimonials();

  const testimonials: Testimonial[] = (data?.data.testimonials || []).map(
    (t) => ({
      name: t.name,
      quote: t.description || "",
      designation: "",
      src: t.testimonial_images?.[0]?.url || "",
    })
  );

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const isActive = (index: number) => index === active;
  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <>
      {/* Add Testimonial Button */}
      <div className="flex float-right mx-10 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] px-4 py-2 text-white rounded-md">
        <button onClick={() => setIsModalOpen(true)}>Add Testimonial</button>
      </div>

      {/* Modal component */}
      <TestimonialFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Testimonials Display */}
      <div className="mx-auto max-w-sm px-4  z-1 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        {isLoading ? (
          <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
            <div className="relative h-80 w-full">
              <Skeleton height={"100%"} borderRadius="1.5rem" />
            </div>

            <div className="flex flex-col justify-between py-4 space-y-4">
              <Skeleton height={30} width="60%" />
              <Skeleton height={20} width="30%" />
              <Skeleton count={5} height={15} />
              <div className="flex gap-4 pt-12 md:pt-0">
                <Skeleton circle height={28} width={28} />
                <Skeleton circle height={28} width={28} />
              </div>
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-500">
            No testimonials found.
          </div>
        ) : (
          <div className="sticky grid grid-cols-1 gap-20 md:grid-cols-2">
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.src}-${index}`}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full  rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-between py-4">
              <motion.div
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  {testimonials[active]?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  {testimonials[active]?.designation}
                </p>
                <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                  {(testimonials[active]?.quote || "")
                    .split(" ")
                    .map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                </motion.p>
              </motion.div>

              <div className="flex gap-4 pt-12 md:pt-0">
                <button
                  onClick={handlePrev}
                  className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                >
                  <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                >
                  <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestimonialSlider;
