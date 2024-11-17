"use client";
import AllProduct from "@/Components/AllProduct";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import {  FiChevronDown, FiChevronUp } from "react-icons/fi";


const HomePage = () => {
  const [isPriceVisible, setPriceVisible] = useState(true);
  const [isRatingVisible, setRatingVisible] = useState(true);
  const [isDiscountVisible, setDiscountVisible] = useState(true);
  const [isAvailabilityVisible, setAvailabilityVisible] = useState(true);

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-md h-[40rem] top-4">
          <h2 className="font-semibold text-xl mb-4">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setPriceVisible(!isPriceVisible)}
            >
              <h3 className="font-medium">Price</h3>
              {isPriceVisible ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            <div
              className={`mt-2 transition-all duration-300 overflow-hidden ${
                isPriceVisible ? "max-h-40" : "max-h-0"
              }`}
            >
              <input type="range" min="1" max="500" className="w-full mb-2" />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="₹1"
                  className="w-1/2 p-1 border rounded"
                />
                <input
                  type="text"
                  placeholder="₹500"
                  className="w-1/2 p-1 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setRatingVisible(!isRatingVisible)}
            >
              <h3 className="font-medium">Rating</h3>
              {isRatingVisible ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            <div
              className={`mt-2 transition-all duration-300 overflow-hidden ${
                isRatingVisible ? "max-h-40" : "max-h-0"
              }`}
            >
              {[4, 3, 2].map((rating) => (
                <div key={rating} className="flex items-center gap-2 mb-1">
                  <FaStar className="text-yellow-500" />
                  <span>{rating} & Up</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discount Filter */}
          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setDiscountVisible(!isDiscountVisible)}
            >
              <h3 className="font-medium">Discount</h3>
              {isDiscountVisible ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            <div
              className={`mt-2 transition-all duration-300 overflow-hidden ${
                isDiscountVisible ? "max-h-40" : "max-h-0"
              }`}
            >
              {[10, 20, 30, 40, 50, 60].map((discount) => (
                <div key={discount} className="flex items-center gap-2 mb-1">
                  <input type="checkbox" />
                  <span>{discount}% or more</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setAvailabilityVisible(!isAvailabilityVisible)}
            >
              <h3 className="font-medium">Availability</h3>
              {isAvailabilityVisible ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            <div
              className={`mt-2 transition-all duration-300 overflow-hidden ${
                isAvailabilityVisible ? "max-h-20" : "max-h-0"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" />
                <span>Out of Stock</span>
              </div>
            </div>
          </div>
        </aside>

        <AllProduct />
      </div>
    </div>
  );
};

export default HomePage;
