"use client";

import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import Image from "next/image";
import { useAllProducts } from "@/api/product/queries/useProductQuery";
import Link from "next/link";
import ProductSkeleton from "../Skeleton";
import { useAuthStore } from "@/store/auth";
import { useAddToCartMutation } from "@/api/cart/query/useCartQuery";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FilterProduct from "./FilterProduct";
import FilterMobileScreen from "./FilterMobileScreen/FilterMobileScreen";

interface Product {
  _id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_selling_price: number;
  product_discount: number;
  product_images: { url: string }[];
  category: { category_name: string }[];
}

const AllProduct = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useAllProducts();
  const { mutate: addToCart } = useAddToCartMutation();

  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // const [selectedDiscount, setSelectedDiscount] = useState<
  //   number | undefined
  // >();
  // const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
  //   []
  // );

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  const applyFilters = () => {
    if (data?.data?.products) {
      const filtered = data.data.products.filter((product: Product) => {
        const meetsFilter =
          selectedFilter === "PromotionalProduct"
            ? product.product_discount > 0
            : selectedFilter === "BrowserProduct"
            ? product.product_discount === 0
            : true;

        const meetsCategory = selectedCategories.length
          ? product.category.some((cat) =>
              selectedCategories.includes(cat.category_name)
            )
          : true;

        return meetsFilter && meetsCategory;
      });
      setFilteredProducts(filtered);
    }
  };

  const clearFilters = () => {
    setFilteredProducts([]);
    setSelectedFilter(null);
    setSelectedCategories([]);
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

  const displayedProducts = filteredProducts.length
    ? filteredProducts
    : data?.data.products || [];

  return (
    <>
      {/* for large screen and medium screen */}
      <div className="mx-auto">
        <h1 className="text-center text-3xl font-semibold">Browse Products</h1>

        {/* filter for mobile screen */}
        <FilterMobileScreen
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {/* Category and Discount Filter */}
        <div className="">
          {/* <div className="hidden md:block lg:block"> */}
          {/* <FilterProduct
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          /> */}
          {/* </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-6">
            <>
              <FilterProduct
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
              {displayedProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 shadow-lg group relative transition-transform transform hover:scale-105 duration-500"
                >
                  {/* Product Image */}
                  <div className="relative">
                    {product.product_discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                        Promotion
                      </span>
                    )}
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
                      <button className="absolute top-2 right-2 p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300">
                        <FaShareAlt className="text-black hover:text-white h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 pb-16 relative">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.product_name}
                    </h3>
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
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                    <Link
                      href={`/buynow/${product._id}`}
                      className="w-1/2 py-2 bg-gradient-to-r flex items-center justify-center from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
                    >
                      BUY NOW
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="w-1/2 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProduct;
