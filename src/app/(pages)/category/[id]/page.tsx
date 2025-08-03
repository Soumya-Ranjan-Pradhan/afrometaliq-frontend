"use client";

import { useParams, useRouter } from "next/navigation";
import { useProducts } from "@/api/product/queries/useProductQuery";
import Image from "next/image";
import ProductSkeleton from "@/Components/Skeleton";
import { useAuthStore } from "@/store/auth";
import { FaHeart, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import {
  useAddToCartMutation,
  useCartQuery,
} from "@/api/cart/query/useCartQuery";
import { toast } from "react-toastify";
import { getFromLS } from "@/lib/storage";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdShoppingCartCheckout } from "react-icons/md";

const CategoryProductsPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const { t } = useTranslation();

  const { data, isLoading, isError } = useProducts({
    categories: id,
  });

  const { mutate: addToCart } = useAddToCartMutation();

  // const handleAddToCart = (productId:string) => {
  //   if (!user?._id) {
  //     toast.warn("Please login before adding items to the cart.");
  //     router.push("/signin");
  //     return;
  //   }

  //   addToCart(
  //     { productId, quantity: 1 },
  //     {
  //       onSuccess: () => {
  //         toast.success("Item added to cart successfully!");
  //       },
  //       onError: () => {
  //         toast.error("Failed to add item to cart. Please try again.");
  //       },
  //     }
  //   );
  // };

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

    if (isError || data?.data?.products?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741003029/hho762f50ln5rqlsbty4.png"
            alt="No Products"
            width={200}
            height={200}
          />
          <p className="text-xl font-bold text-red-600 mt-4">
            No products found in this category.
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            Please choose a different category from the menu.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      );
    }
    

  const products = data?.data.products || [];

  return (
    <>
      <div className="mx-auto p-4">
        <h1 className="text-center text-3xl font-semibold mb-8">
          Browse Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
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
                  {/* <button
                    // onClick={() => openModal(product)}
                    className="p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300"
                  >
                    <TfiFullscreen className="text-black hover:text-white h-6 w-6" />
                  </button> */}
                  {/* <button className="p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300">
                    <FaHeart className="text-gray-600 hover:text-white h-6 w-6" />
                  </button> */}
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 pb-[6rem] relative px-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.product_name}
                </h3>

                {/* Category info or Coming Soon */}
                {product.category && product.category.length > 0 ? (
                  <p className="text-sm text-gray-500">
                    {product.category
                      .map((cat) => cat.category_name)
                      .join(", ")}
                  </p>
                ) : (
                  <span className="text-xs bg-yellow-200 text-yellow-800 font-semibold px-2 py-1 rounded-full inline-block mt-1">
                    Coming Soon
                  </span>
                )}

                <div className="text-lg mb-2 font-bold text-purple-600">
                  {user?._id ? (
                    <span className="text-sm font-bold text-gray-700">
                      MZN {product.product_selling_price} Sale
                    </span>
                  ) : (
                    <p className="text-[10px] text-red-500 md:mb-4">
                      {t("login_to_price")}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-4 left-4  right-4 space-y-1">
                <Link
                  onClick={() => handleAddToCart(product._id)}
                  href={`/cart`}
                  className="w-full py-2 bg-gradient-to-r flex items-center justify-center  from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md"
                >
                  {t("buy_now")}
                </Link>

                {/* <button
                  onClick={() => handleAddToCart(product._id)}
                  className="w-full py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md"
                  disabled={loadingIds.includes(product._id)}
                >
                  {loadingIds.includes(product._id) ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin text-white text-lg" />
                    </div>
                  ) : (
                    t("add_to_cart")
                  )}
                </button> */}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="w-full py-2 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white font-semibold rounded-md flex items-center justify-center"
                  disabled={loadingIds.includes(product._id)}
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
        </div>
      </div>

      {/* <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Products in Category: {id}</h1>
        {products.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={
                      product.product_images[0]?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.product_name}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold">
                  {product.product_name}
                </h2>
                <p className="text-sm text-gray-500">
                  {product.category.map((cat) => cat.category_name).join(", ")}
                </p>
                <p className="text-green-600 font-bold mt-2">
                  Price: ${product.product_price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </>
  );
};

export default CategoryProductsPage;
