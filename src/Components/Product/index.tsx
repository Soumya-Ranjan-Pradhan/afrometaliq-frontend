"use client";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { TfiFullscreen } from "react-icons/tfi";
import ProductModal from "./ModalProduct";
import Image from "next/image";
import Link from "next/link";
import { useAllProducts, useProducts } from "@/api/product/queries/useProductQuery";
import { useGlobalStore } from "@/store/global";
import ProductSkeletons from "../Skeleton/ProductSkeleton";
import { useAuthStore } from "@/store/auth";

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

const Product = () => {
  const { data, isLoading, error } = useAllProducts();
  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const handleClick = () => {
    setComingSoon(true);
  };

  // const openModal = (product: Product) => {
  //   setSelectedProduct(product);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedProduct(null);
  // };

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeletons key={index} />
        ))}
      </div>
    );

  if (error) return <div>Error fetching products</div>;

  // const handleBuyNow = (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   productId: number
  // ) => {
  //   e.preventDefault();
  //   // navigation to checkout page
  //   router.push(`/buy-now/${productId}`);
  // };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-3xl font-semibold mb-8">
        Browse Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data.products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500"
          >
            {/* Product Image */}
            <div className="relative">
              <Link key={product._id} href={`/product/${product._id}`}>
                <Image
                  src={product.product_images[0]?.url}
                  alt={product.product_name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md"
                />
              </Link>

              {/* Icons to show on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  // onClick={() => openModal(product)}
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
              {/* <p className="mt-2 text-green-400">{product.stock}</p> */}
              {/* <div className="flex items-center mt-2">
                <span className="text-lg font-bold text-purple-600">
                  {
                    user?._id ? (
                      <span className="text-lg font-bold text-gray-700">
                       ₹{product.product_price.toLocaleString()}
                      </span>
                    ) : (
                      <p className="text-sm text-gray-500">
                         login to see the price
                      </p>
                    )
                  }
                 
                </span>
              </div> */}

              <div className="text-sm text-gray-500 mt-1">
                {user?._id ? (
                  <span className="text-sm font-bold text-gray-700">
                    MZN {product.product_selling_price} Sale
                  </span>
                ) : (
                  <p className="text-sm text-red-500">
                     login to see the price
                  </p>
                )}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex items-center justify-between gap-2">
              <Link href={`/buynow/${product._id}`}
                className="w-full mt-4 py-2 bg-gradient-to-r flex items-center justify-center from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
              >
                BUY NOW
              </Link>
              <button
                className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
                onClick={handleClick}
              >
                Add To Cart
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

      {/* <ComingSoonModal isOpen={isModalOpen} onRequestClose={closeModal} /> */}
    </div>
  );
};

export default Product;
