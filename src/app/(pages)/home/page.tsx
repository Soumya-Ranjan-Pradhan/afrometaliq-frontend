"use client";
import React from "react";
import { FaGlobe } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {/* Top Section */}
      <div className="text-center p-6 md:p-10 bg-white shadow-lg rounded-lg max-w-2xl w-full">
        <div className="mb-6">
          <img
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1734198307/cqhxu8qnouji9e74o7nm.jpg" 
            alt="Atlantica Steel Logo"
            className="mx-auto w-32 md:w-40 lg:w-48"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Welcome to Atlantica Steel
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          If you are looking for a roofing solution, we’ve got you covered.
        </p>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Please select your preferred language to explore our website.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-6 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition-all">
            <FaGlobe className="mr-2" /> English
          </button>
          <button className="flex items-center px-6 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition-all">
            <FaGlobe className="mr-2" /> Portuguese
          </button>
        </div>
      </div>

      {/* Steel Image Section */}
      <div className="mt-8">
        <img
          src="/steel.jpg" // Add your steel image in the public folder
          alt="Steel Background"
          className="rounded-lg shadow-md w-11/12 md:w-3/4 lg:w-2/3 mx-auto"
        />
      </div>
    </div>
  );
};

export default Home;
