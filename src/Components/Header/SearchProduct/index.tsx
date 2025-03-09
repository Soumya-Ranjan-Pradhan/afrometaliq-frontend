"use client";

import { Product } from "@/api/product/productApi";
import { useSearchProducts } from "@/api/product/queries/useProductQuery";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

const SearchProduct = () => {
  const [query, setQuery] = useState<string>("");
  const { data, isLoading, refetch } = useSearchProducts(query);
  const [showResults, setShowResults] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  useEffect(() => {
    if (query.length > 0) {
      setShowResults(true);
      refetch();
    } else {
      setShowResults(false);
    }
  }, [query, refetch]);

  const handleSelectProduct = (product: Product) => {
    setQuery("");
    setShowResults(false);
    router.push(`/product/${product._id}`);
  };

  const handleReset = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-lg ">
      <div className="flex items-center border border-gray-300 rounded-full">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-l-full focus:outline-none"
        />

        {query && !isLoading && (
          <IoMdClose
            className="text-gray-500 cursor-pointer text-xl mr-2"
            onClick={handleReset}
          />
        )}

        <button className="px-4 py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white rounded-r-full">
          {isLoading ? (
            <FaSpinner className="animate-spin text-2xl" />
          ) : (
            <IoIosSearch className="text-2xl" />
          )}
        </button>
      </div>

      {/* Enhanced Search Results Dropdown */}
      {showResults && query && data?.data?.products?.length ? (
        <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {data.data.products.map((product) => (
            <div
              key={product._id}
              className="p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleSelectProduct(product)}
            >
              {product.product_name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchProduct;
