"use client";
import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center px-6 lg:px-20 bg-gradient-to-br from-[#C1DEE8] via-[#FBD9B9] to-[#FDF8F3]">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Text */}
        <div className="space-y-6 text-center md:text-left">
          <h4 className="text-lg text-gray-600">Welcome to Real Estate</h4>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Your <br /> <span className="text-[#000]">Property</span>
          </h1>
          <p className="text-gray-700 text-lg">
            You will have everything nearby: supermarket, buses, stations, the
            Carmen neighborhood, etc.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1743067998/rz1pvyjih7do1rhdd0qm.png"
            alt="Modern Property"
            width={600}
            height={500}
            className="rounded-lg shadow-lg w-full max-w-[500px] md:max-w-[600px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
