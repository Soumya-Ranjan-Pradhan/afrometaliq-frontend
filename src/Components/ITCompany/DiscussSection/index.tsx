"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const DiscussSection = () => {
  return (
    <section className="relative items-center justify-center md:flex-row md:justify-between">
      {/* Top Line with Icon */}
      <div className="absolute top-0 flex items-center justify-center w-full">
        <div className="h-[2px] w-3/4 bg-gray-300 relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742981154/wooiewqogm6uhtf4c0qs.png"
              alt="Icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      <div className="text-center flex items-center justify-center py-7">
        <h2 className="text-4xl font-bold text-gray-900">
          Let&apos;s <span className="text-red-500">Discuss</span>
        </h2>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between p-8 bg-white">
        {/* Left Side Content */}
        <div className="relative flex justify-center w-full md:w-1/2">
          <motion.div
            className="relative p-4 border-2 border-dashed border-red-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }} // Tip Tip Tip effect
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742985877/hegdocwjdwluqu8tqm9n.png"
              alt="Team Working"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </motion.div>
        </div>

        {/* Information Box */}
        <div className="p-6 bg-gray-50 shadow-lg rounded-lg border border-gray-200 mt-6 md:mt-0">
          <p className="text-red-500 font-semibold">
            At MuleSoft IT Services, we thrive on challenges and are passionate
            about delivering exceptional results.
          </p>
          <p className="text-gray-700 mt-2">
            With our experienced team of IT professionals, we have the expertise
            &amp; knowledge to tackle projects of varying sizes.
          </p>
          <Link href="/contact">
            <button className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
              Contact us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscussSection;
