"use client";

import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button";
import { useSearchProducts } from "@/api/product/queries/useProductQuery";
import { useRouter } from "next/navigation";
import { Product } from "@/api/product/productApi";
import { IoMdClose } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

interface SearchForSmallScreenProps {
  open: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchForSmallScreen: React.FC<SearchForSmallScreenProps> = ({
  open,
  setOpenSearch,
}) => {
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
    <>
      {open && (
        <div className="fixed  bg-black bg-opacity-90 z-50 inset-0 h-screen w-full flex items-start justify-start">
          <div className="sm:p-8 p-4 relative w-full">
            <div className="absolute top-5 right-5">
              <IoCloseCircleOutline
                size={30}
                onClick={() => setOpenSearch((prev) => !prev)}
              />
            </div>
            <form className="flex items-center mt-10">
              <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={handleSearch}
                className="px-3 py-2 bg-[#0E0F0F] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600 w-full "
              />
              {query && !isLoading && (
                <IoMdClose
                  className="text-gray-500 cursor-pointer text-xl mr-2"
                  onClick={handleReset}
                />
              )}
              <Button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-2xl" />
                ) : (
                  <p> Search</p>
                )}
              </Button>
            </form>
          </div>

          {/* Enhanced Search Results Dropdown */}
        </div>
      )}

      <>
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-start justify-center h-screen w-full">
            <div className="w-full max-w-md mx-auto p-4">
              {/* Close Button */}
              <div className="absolute top-5 right-5 text-white cursor-pointer">
                <IoCloseCircleOutline
                  size={30}
                  onClick={() => setOpenSearch(false)}
                />
              </div>

              {/* Search Form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center mt-10 space-x-2"
              >
                <div className="relative flex-grow">
                  <IoMdClose
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={query}
                    onChange={handleSearch}
                    className="w-full px-10 py-3 bg-[#0E0F0F] text-white placeholder-gray-400 outline-none focus:bg-[#222222] border border-slate-600 rounded-full"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0C3D20] text-white font-semibold rounded-full"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin text-2xl" />
                  ) : (
                    <p> Search</p>
                  )}
                </button>
              </form>

              {showResults && query && data?.data?.products?.length ? (
                <div className="mt-4 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto">
                  {data.data.products.map((product) => (
                    <div
                      key={product._id}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <p
                        className="font-semibold text-gray-800"
                        onClick={() => setOpenSearch((prev) => !prev)}
                      >
                        {product.product_name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default SearchForSmallScreen;
