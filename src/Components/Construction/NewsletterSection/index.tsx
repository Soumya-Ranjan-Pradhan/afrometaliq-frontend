"use client";
import Image from "next/image";

const NewsletterSection = () => {
  return (
    <section className="w-full px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-10 rounded-3xl"
      style={{
        background: "linear-gradient(to right, #e0eafc, #cfdef3)"
      }}
    >
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">Subscribe Our Newsletter</h1>
        <p className="text-gray-700 mt-4">
          Lorem ipsum dolor sit amet consectetur. Feugiat ut aliquet sit pellentesque sollicitudin.
          Egestas faucibus lacus diam in senectus consectetur. Mattis elit adipiscing quisque tellus scelerisque
          vehicula ante nunc.
        </p>

        {/* Contact Us Button */}
        <div className="mt-6">
          <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800">
            Contact Us
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1743069764/yyffexfta50qwhqag6f0.png"
            alt="Modern House"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
