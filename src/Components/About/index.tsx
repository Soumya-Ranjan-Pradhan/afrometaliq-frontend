"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center my-10 mx-auto max-w-6xl px-6">
      {/* Left Image Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <div className="relative">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1743010598/lg2ep51nzbavfy0guitu.png"
            alt="Experience"
            width={500}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-1/2 lg:pl-8">
        <h2 className="text-red-600 text-xl font-semibold mb-2">
          {t("about_us")}
        </h2>
        <h1 className="text-4xl font-bold mb-4">{t("about_title")}</h1>

        <div className="bg-[#F9F9F9] mb-4 p-6 rounded-lg ">
          <p className="text-gray-700 ">{t("about_des")}</p>
          <p className="font-bold mt-6">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
              Soumya Ranjan Pradhan,
            </span>{" "}
            CEO
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
