"use client";

import { FC } from "react";
import Image from "next/image"; 
import { AiOutlineClose } from "react-icons/ai";

interface WishlistCardProps {
  product: {
    id: number;
    image: string;
    name: string;
    price: string;
    originalPrice: string;
    discount: string;
  };
  onRemove: (id: number) => void;
}

const WishlistCard: FC<WishlistCardProps> = ({ product, onRemove }) => {
  return (
    <div className="relative border p-4 rounded-lg shadow-md bg-white flex flex-col">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-500 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200"
        onClick={() => onRemove(product.id)}
      >
        <AiOutlineClose size={20} />
      </button>

      {/* Product Image */}
      <div className="w-full flex items-center mt-2 justify-center h-[15rem] relative">
        <Image
          src={product.image}
          alt={product.name}
          width={350}
          height={80}
          className="object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <h3 className="lg:mt-9 mt-2 text-sm font-semibold text-gray-700">{product.name}</h3>
      <div className="flex items-center mt-1 space-x-2">
        <p className="text-lg font-bold text-black">{product.price}</p>
        <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
        <p className="text-sm text-green-600">{product.discount}</p>
      </div>

      {/* Move to Bag Button */}
      <button
        className="mt-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 px-4 rounded-md "
      >
        Move to Bag
      </button>
    </div>
  );
};

export default WishlistCard;
