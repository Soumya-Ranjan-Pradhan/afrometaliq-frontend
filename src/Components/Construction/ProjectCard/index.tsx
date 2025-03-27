"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const projects = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1743068983/sfonajxibjrzwfg38brw.png",
    title: "Sobha Hearland II Villas",
    description: "Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum.",
    rating: 4.83,
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1743068983/sfonajxibjrzwfg38brw.png",
    title: "Sobha Hearland II Villas",
    description: "Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum.",
    rating: 4.83,
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1743068983/sfonajxibjrzwfg38brw.png",
    title: "Sobha Hearland II Villas",
    description: "Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum.",
    rating: 4.83,
  },
];

const RecentProjects = () => {
  return (
    <section className="w-full py-16 px-6">
      <p className="text-blue-500 text-lg text-center">Best Project of the Years</p>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 text-center">Our recent projects</h2>

      <div className="relative mt-10">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden p-4"
              >
                <img src={project.image} alt={project.title} className="w-full rounded-lg" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  <div className="flex items-center justify-center mt-3">
                    <BsStarFill className="text-yellow-500" />
                    <BsStarFill className="text-yellow-500" />
                    <BsStarFill className="text-yellow-500" />
                    <BsStarFill className="text-yellow-500" />
                    <BsStarHalf className="text-yellow-500" />
                    <span className="ml-2 text-gray-600">{project.rating}</span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev absolute top-1/2 -left-6 z-10 transform -translate-y-1/2 bg-black text-white rounded-full p-3">
          <IoIosArrowBack />
        </button>
        <button className="swiper-button-next absolute top-1/2 -right-6 z-10 transform -translate-y-1/2 bg-black text-white rounded-full p-3">
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
};

export default RecentProjects;
