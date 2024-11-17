"use client";
import Image from "next/image";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const Orders = () => {
  return (
    <>
      {/* <div className="flex justify-center items-center">
        <img src={""} alt="" className="w-[20rem]" />
      </div>
      <p className="text-[1.3rem] font-bold items-center text-center">
        You haven't placed any order yet!
      </p>
      <p className="text-[1rem] items-center text-center  mb-7">
        Order section is empty. After placing order, You can track them from
        here!
      </p> */}

      <div className="container mx-auto p-4 space-y-6">
        {/* Delivery Address Section */}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Order Confirmed */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Order Confirmed</p>
              <p className="text-xs text-gray-500">Fri, 11th Oct</p>
            </div>
            {/* Progress Line */}
            <div className="hidden md:block w-24 h-1 bg-green-500"></div>
            {/* Shipped */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Shipped</p>
              <p className="text-xs text-gray-500">Tue, 15th Oct</p>
            </div>
            {/* Progress Line */}
            <div className="hidden md:block w-24 h-1 bg-green-500"></div>
            {/* Out for Delivery */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Out for Delivery</p>
              <p className="text-xs text-gray-500">Fri, 18th Oct</p>
            </div>
            {/* Progress Line */}
            <div className="hidden md:block w-24 h-1 bg-green-500"></div>
            {/* Delivered */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Delivered</p>
              <p className="text-xs text-gray-500">Fri, 18th Oct</p>
            </div>
          </div>
        </div>

        {/* Order Tracking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 sm:grid-cols-1">
          {/* Order Item Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Image
                width={100}
                height={100}
                src="https://via.placeholder.com/100"
                alt="Product"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  HIGHLANDER Men Solid Casual White Shirt
                </h3>
                <p className="text-gray-500 text-sm">Color: White Size: M</p>
                <p className="text-gray-500 text-sm">
                  Seller: HSAtlasTradeFashion
                </p>
                <p className="text-lg font-semibold mt-2">₹484</p>
                <p className="text-green-600 text-sm mt-1">
                  1 Offer & 1 Coupon Applied
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Return policy ended on Oct 28
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
            <p className="font-semibold">Soumya Ranjan Pradhan</p>
            <p className="text-gray-600">
              VIM-89, A.N Mohanty House Sailashree Vihar Phase-6, Sailashree
              Vihar, Infront of BMC Children Park Bhubaneswar - 751021, Odisha
            </p>
            <p className="font-semibold mt-2">Phone number: 6371151160</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
