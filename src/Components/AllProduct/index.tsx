"use client";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { TfiFullscreen } from "react-icons/tfi";
import ProductModal from "../Product/ModalProduct";
import Image from "next/image";
import {
  useAllProducts,
  useProducts,
} from "@/api/product/queries/useProductQuery";
import Link from "next/link";
import { useGlobalStore } from "@/store/global";
import ProductSkeleton from "../Skeleton";
import { useAuthStore } from "@/store/auth";
import { useAddToCartMutation } from "@/api/cart/query/useCartQuery";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useAllProducts();
  const { mutate: addToCart } = useAddToCartMutation();

  const handleAddToCart = (productId: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.warn("Please login before adding items to the cart.");
      router.push("/signin");
      return;
    }

    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Item added to cart successfully!");
        },
        onError: () => {
          toast.error("Failed to add item to cart. Please try again.");
        },
      }
    );
  };

  const handleClick = () => {
    setComingSoon(true);
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="mx-auto p-4">
        <h1 className="text-center text-3xl font-semibold mb-8">
          Browse Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data?.data.products.map((product: any) => (
          <div
            key={product.id}
            className="flex flex-col border rounded-lg shadow-lg overflow-hidden group relative transition-transform transform hover:scale-105 duration-500"
          >
            {/* Product Image */}
            <div className="relative aspect-w-4 aspect-h-3">
              <Link href={`/product/${product._id}`}>
                <Image
                  src={product.product_images[0]?.url}
                  alt={product.product_name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md"
                />
              </Link>

              {/* Icons to show on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-2 right-2 space-y-2">
                <button
                  onClick={() => openModal(product)}
                  className="p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300"
                >
                  <TfiFullscreen className="text-black hover:text-white h-6 w-6" />
                </button>
                <button className="p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300">
                  <FaHeart className="text-gray-600 hover:text-white h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col p-4 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product?.product_name}
              </h3>
              <p className=" text-gray-600 text-sm leading-6">
                {product?.product_description}
              </p>
              <p className="text-sm text-green-400 mt-1">{product?.stock}</p>
              <div className="mt-2">
                {user?._id ? (
                  <>
                    <span className="text-lg font-bold text-gray-700">
                      MZN {product.product_selling_price.toLocaleString()} Sale
                    </span>
                    <p className="text-lg line-through text-gray-500">
                      MZN {product.product_price.toLocaleString()}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-red-600">
                    Login to see the price
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 p-4">
              <Link 
                href={`/buynow/${product._id}`}
               
                className="w-full flex items-center justify-center py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
              >
                BUY NOW
              </Link>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
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
    </div>
  );
};

export default AllProduct;
