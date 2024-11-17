"use client";
import ProductTabs from "@/Components/Product/ProductTabs";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaExchangeAlt } from "react-icons/fa";
const Page = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="border rounded-lg overflow-hidden">
              <Image
                src="https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg"
                alt="Product"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex mt-4 gap-2">
              {[...Array(2)].map((_, index) => (
                <Image
                  key={index}
                  src="https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg"
                  alt={`Thumbnail ${index}`}
                  width={80}
                  height={80}
                  className="w-16 h-16 object-cover border rounded-md cursor-pointer hover:opacity-75"
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-semibold text-gray-800">
              Men Checkered Long Sleeve Casual Shirt
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Brands: <span className="font-bold text-gray-700">BUSHIRT</span>{" "}
             
            </p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-red-500 text-2xl font-bold">Rs. 850</span>
              <span className="text-gray-400 line-through text-lg">
                Rs. 1200
              </span>
            </div>

            <p className="mt-2">
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-sm font-semibold">
                IN STOCK
              </span>
            </p>

            <p className="mt-6 text-gray-600 text-sm leading-6">
              Rs: Be a head-turner by wearing this casual shirt from BUSHIRT and
              grab it in brown color. Showcase this top in wonderful prints and
              wear it for different occasions. Buy this outstanding collection
              in a 47 size & get it in fabric made of cotton material. Bored of
              the conventional shirt look? Well, these casual shirts in graceful
              neck designs and long sleeves will give you a whole new dimension!
            </p>

            {/* Sizes */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Length</h3>
              <div className="flex gap-4">
                {["6m", "9m", "13m", "NA"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelection(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-800"
                    } hover:bg-green-600 hover:text-white transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 border-r bg-gray-100 hover:bg-gray-200 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center outline-none bg-white"
                />
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 border-l bg-gray-100 hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>

              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white rounded-lg font-semibold hover:bg-red-600 transition">
                <span className="mr-2 ">🛒</span>Add To Cart
              </button>
            </div>

            {/* Wishlist and Compare */}
            <div className="mt-6 flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <FaHeart className="text-red-500" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <FaExchangeAlt />
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs />
    </>
  );
};

export default Page;
