"use client";

import { useProductById } from "@/api/product/queries/useProductQuery";
import Address from "@/Components/CartBilling";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const SinglePageBuyNow = ({ params }: { params: { id: string } }) => {
  const { data } = useProductById(params.id);

  const product = data?.data.product;
  return (
    <>
      <div className="container mx-auto bg-white shadow-md lg:h-[5em]">
        <div className="lg:flex hidden items-center justify-between mx-[10rem]">
          <Image
            src="https://res.cloudinary.com/dndq25au1/image/upload/v1729361117/d6zwh0crdjjhmrtzfzkj.jpg"
            alt="Arfo Metaliq Logo"
            width={190}
            height={190}
          />
          <div className="flex items-center gap-5">
            <p className="text-blue-700 text-[1.2em] font-bold underline font-ui-sans-serif">
              BAG
            </p>
            <p className="text-gray-700 text-[1.2em] font-bold font-ui-sans-serif">
              Address
            </p>
            <p className="text-gray-700 text-[1.2em] font-bold font-ui-sans-serif">
              Payment
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              alt="Arfo Metaliq Logo"
              src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
              width={40}
              height={40}
            />
            <p>100% Secure</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 lg:flex lg:space-x-8">
        {/* Left Section */}
        <div className="lg:w-3/5">
          <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <p className="font-semibold">
                Deliver to:{" "}
                <span className="text-[#24246C]">
                  Soumya Ranjan Pradhan, 759122
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Saradhapur Petrol Pump, Angul, Angul H.O, Angul
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="mt-6">
            <div
              id={product?._id.toString()}
              key={product?._id.toString()}
              className="flex items-center border p-4 rounded-md mb-4"
            >
              <div className="w-20 h-20"></div>
              <div className="flex-1 ml-4">
                <div className="flex justify-between items-center space-x-2">
                  <h3 className="font-semibold">
                    {product?.product_name || "Product not available"}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm">
                  {product?.product_code || "Unknown code"}
                </p>
                <div className="lg:float-right md:float-right">
                  <p className="text-red-500 font-semibold text-[1.2rem]">
                    ₹{product?.product_selling_price?.toFixed(2) || 0}
                  </p>
                  <div>
                    <span className="line-through text-gray-400">
                      {" "}
                      <span className="line-through text-gray-400">
                        ₹{product?.product_price?.toFixed(2) || 0}
                      </span>{" "}
                      {product?.product_discount || 0}% OFF
                    </span>
                  </div>
                </div>
                <div className="flex items-center lg:mt-5 md:mt-5 space-x-4">
                  <button className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center">
                    <FaMinus size={12} />
                  </button>

                  <p className="text-sm">1</p>

                  <button className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center">
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/5 mt-8 lg:mt-0">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-lg">Price Details (1 Items)</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <p>Total MRP</p>
                <p>₹120</p>
              </div>
              <div className="flex justify-between">
                <p>Discount on MRP</p>
                <p className="text-green-500">-120</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>FREE</p>
              </div>
              <div className="flex justify-between">
                <p>Platform Fee</p>
                <p>₹20</p>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <p>Total Amount</p>
                <p>₹100</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white w-full py-2 mt-4 rounded-md">
                  PAY NOW
                </button>

                <button className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white w-full py-2 mt-4 rounded-md">
                  Send Quotation
                </button>
              </div>
            </div>
          </div>
          <Address />
        </div>
      </div>
    </>
  );
};

export default SinglePageBuyNow;
