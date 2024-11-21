"use client";
import React, { useState } from "react";
import { FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import { TfiFullscreen } from "react-icons/tfi";
import ProductModal from "./ModalProduct";
import Image from "next/image";
import Link from "next/link";
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

const Product = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "This is a high-quality mild steel rectangular tube, ideal for construction projects.",
    },
    
    {
      id: 2,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "Durable rectangular tube for structural purposes, made from mild steel.",
    },

    {
      id: 3,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "Durable rectangular tube for structural purposes, made from mild steel.",
    },

    {
      id: 4,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "Durable rectangular tube for structural purposes, made from mild steel.",
    },
    {
      id: 5,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "Durable rectangular tube for structural purposes, made from mild steel.",
    },
    {
      id: 6,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "Durable rectangular tube for structural purposes, made from mild steel.",
    },
    {
      id: 7,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "Durable rectangular tube for structural purposes, made from mild steel.",
    },

    {
      id: 8,
      name: "Rectangular Tube - 76mm x 38mm - 1.6mm - Mild Steel",
      stock: "In Stock",
      price: 1179,
      originalPrice: 1749,
      salesCount: 258,
      rating: 3.5,
      imageUrl:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      description:
        "Durable rectangular tube for structural purposes, made from mild steel.",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500 h-5 w-5" />);
      } else if (i - rating < 1 && i > rating) {
        stars.push(<FaStar key={i} className="text-yellow-500 h-5 w-5" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500 h-5 w-5" />);
      }
    }
    return stars;
  };

  const router = useRouter();
  const handleBuyNow = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.preventDefault();
    // navigation to checkout page
    router.push(`/buy-now/${productId}`);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center text-3xl font-semibold mb-8">
        Browse Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
       
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500"
            >
              {/* Product Image */}
              <div className="relative">
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </Link>

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
                  {product.name}
                </h3>
                <p className="mt-2 text-green-400">{product.stock}</p>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-purple-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm line-through text-gray-400 ml-2">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  {renderStars(product.rating)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {product.salesCount} Sale
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <button
                  className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
                  onClick={(e) => handleBuyNow(e, product.id)}
                >
                  BUY NOW
                </button>

                <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md">
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

export default Product;
