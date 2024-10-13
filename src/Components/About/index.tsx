// components/AboutUs.tsx

import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center my-10 mx-auto max-w-6xl px-6">
      {/* Left Image Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <div className="relative">
          <Image
            src="https://res.cloudinary.com/datf6laqn/image/upload/v1728803021/lhko7mosdewj51caei25.png"
            alt="Experience"
            width={500}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-1/2 lg:pl-8">
        <h2 className="text-red-600 text-xl font-semibold mb-2">ABOUT US</h2>
        <h1 className="text-4xl font-bold mb-4">
          We&apos;re providing the best customer service
        </h1>

        <div className="bg-[#F9F9F9] mb-4 p-6 rounded-lg ">
          <p className="text-gray-700 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p className="font-bold mt-6">Sudhir, CEO</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
