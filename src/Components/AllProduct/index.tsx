"use client";

import React, { useState } from "react";
import { FaShareAlt, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import {
  useAllProducts,
  useProducts,
} from "@/api/product/queries/useProductQuery";
import Link from "next/link";
import ProductSkeleton from "../Skeleton";
import { useAuthStore } from "@/store/auth";
import { useAddToCartMutation } from "@/api/cart/query/useCartQuery";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FilterProduct from "./FilterProduct";
import FilterMobileScreen from "./FilterMobileScreen/FilterMobileScreen";
import { useTranslation } from "react-i18next";
import { getFromLS } from "@/lib/storage";
import { MdShoppingCartCheckout } from "react-icons/md";

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
  const { t } = useTranslation();
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const user = useAuthStore((state) => state.user);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const { data, isLoading, error, refetch } = useAllProducts({
    discount: selectedFilter === "PromotionalProduct" ? 0 : undefined,
    categories: selectedCategories.length
      ? selectedCategories.join(",")
      : undefined,
    page: pageNumber,
    limit: 17,
  });
  const { mutate: addToCart } = useAddToCartMutation();

  const handleAddToCart = (productId: string) => {
    const token = getFromLS("accessToken");
    if (!token) {
      toast.warn("Please login before adding items to the cart.");
      router.push("/signin");
      return;
    }

    setLoadingIds((prev) => [...prev, productId]);

    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Item added to cart successfully!");
        },
        onError: () => {
          toast.error("Failed to add item to cart. Please try again.");
        },
        onSettled: () => {
          setLoadingIds((prev) => prev.filter((id) => id !== productId));
        },
      }
    );
  };

  const clearFilters = () => {
    setFilteredProducts([]);
    setSelectedFilter(null);
    setSelectedCategories([]);
  };

  const handleNextPage = () => {
    // check if next page is available
    if (!data?.data) return null;
    if (data?.data?.pagination?.totalPages > pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  if (isLoading)
    return (
      <div className="mx-auto p-4">
        <h1 className="text-center text-3xl font-semibold mb-8">
          Browse Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  if (error) return <div>Error fetching products</div>;

  // const displayedProducts = filteredProducts.length
  //   ? filteredProducts
  //   : data?.data.products || [];
  // Apply frontend filtering
  const allProducts = data?.data.products || [];

  const displayedProducts =
    selectedFilter === "PromotionalProduct"
      ? allProducts.filter((p) => p.product_discount > 0)
      : selectedFilter === "BrowserProduct"
      ? allProducts.filter((p) => p.product_discount === 0)
      : allProducts;

  return (
    <>
      {/* for large screen and medium screen */}
      <div className="mx-auto">
        <h1 className="text-center text-3xl font-semibold">
          {t("product_browser")}
        </h1>

        {/* filter for mobile screen */}
        <FilterMobileScreen
          clearFilters={clearFilters}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {/* Category and Discount Filter */}
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-5 gap-6">
            <>
              <FilterProduct
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
                        {t("promotions")}
                      </span>
                    )}
                    <Link key={product._id} href={`/product/${product._id}`}>
                      <Image
                        src={product.product_images[0]?.url || ""}
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
                  <div className="mt-4 pb-[6rem] relative">
                    <Link
                      key={product._id}
                      href={`/product/${product._id}`}
                      className="text-[12px] font-semibold text-gray-800"
                    >
                      {product.product_name}
                    </Link>

                    <h3 className="lg:text-[0.65rem] md:text-[11px] text-[11px] font-semibold text-gray-600">
                      {product.product_description}
                    </h3>
                    <div className="text-lg font-bold text-purple-600">
                      {user?._id ? (
                        <>
                          <span className="text-sm font-bold text-gray-700">
                            MZN {product.product_selling_price} Sale
                          </span>
                          {/* <span className="bg-blue-200 mx-2 text-blue-600 text-sm font-bold px-2 py-1 rounded-full">
                          {product.product_discount}%
                        </span> */}

                          <p className="text-sm font-bold line-through text-gray-500">
                            MZN {product.product_price} Sale
                          </p>
                        </>
                      ) : (
                        <p className="text-[10px] text-red-500 md:mb-4">
                          {t("login_to_price")}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <Link
                     onClick={() => handleAddToCart(product._id)}
                      href={`/cart`}
                      className="w-full py-2 flex items-center justify-center bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md"
                    >
                      {t("buy_now")}
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="w-full py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md"
                    >
                      {/* {loadingIds.includes(product._id) ? (
                        <div className="flex items-center justify-center">
                          <FaSpinner className="animate-spin text-white text-lg" />
                        </div>
                      ) : (
                        t("add_to_cart")
                      )} */}
                      <div className="flex items-center justify-center gap-2">
                        {loadingIds.includes(product?._id || "") ? (
                          <div className="flex items-center justify-center">
                            <FaSpinner className="animate-spin text-white text-lg" />
                          </div>
                        ) : (
                          t("add_to_cart")
                        )}
                        <MdShoppingCartCheckout size={25} color="white" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      </div>

      {/* Added the Pagination here */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage} className="cursor-pointer" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} className="cursor-pointer" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default AllProduct;
