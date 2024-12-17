"use client";
import React, { useState } from "react";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import { TfiFullscreen } from "react-icons/tfi";
import ProductModal from "../Product/ModalProduct";
import Image from "next/image";
import { useProducts } from "@/api/product/queries/useProductQuery";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  salesCount: number;
  imageUrl: string;
  stock: string;
  rating: number;
  description: string;
};

const AllProduct = () => {
  const { data, isLoading, error } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-3xl font-semibold mb-8">
        Browse Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((product: any) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500"
          >
            {/* Product Image */}
            <div className="relative">
              <Image
                 src={product.product_images[0]?.url}
                 alt={product.product_name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />

              {/* Icons to show on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => openModal(product)}
                  className="absolute top-2 right-2 p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300"
                >
                  <TfiFullscreen className="text-black hover:text-white h-6 w-6" />
                </button>
                <button className="absolute top-14 right-2 p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300">
                  <FaHeart className="text-gray-600 hover:text-white h-6 w-6" />
                </button>
              </div>
            </div>
            {/* Product Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
              {product.product_name}
              </h3>
              <p className="mt-2 text-green-400">{product.stock}</p>
              <div className="flex items-center mt-2">
                <span className="text-lg font-bold text-purple-600">
                  ₹{product.product_price.toLocaleString()}
                </span>
                {/* <span className="text-sm line-through text-gray-400 ml-2">
                  ₹{product.product_selling_price.toLocaleString()}
                </span> */}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {product.product_selling_price} Sale
              </div>
            </div>
            <div className="flex">
              <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md">
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Render the Product Modal */}
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AllProduct;
