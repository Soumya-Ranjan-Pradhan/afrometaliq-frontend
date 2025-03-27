"use client";
import Image from "next/image";

const ProjectAbout = () => {
  return (
    <section className="w-full px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-10">
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          We are a global, boutique real estate brokerage
        </h1>

        <h2 className="text-xl font-semibold mt-6">
          The transfer of real estate
        </h2>

        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet consectetur. Feugiat ut aliquet sit
          pellentesque sollicitudin. Egestas faucibus lacus diam in senectus
          consectetur. Mattis elit adipiscing quisque tellus scelerisque
          vehicula ante nunc. Tellus consequat nisl quis nisl justo.
        </p>

        {/* Buttons */}
        <div className="flex justify-center md:justify-start gap-4 mt-6">
          <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800">
            Book Now!
          </button>
          <button className="border border-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
            Read More
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center md:justify-start gap-8 mt-10">
          <div className="text-center">
            <p className="text-3xl font-bold">12+</p>
            <p className="text-gray-600">Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">14+</p>
            <p className="text-gray-600">Offices</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">10+</p>
            <p className="text-gray-600">Students</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1743069406/snwg4zgnj7hw6zbpcgys.png"
            alt="Real Estate"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectAbout;
