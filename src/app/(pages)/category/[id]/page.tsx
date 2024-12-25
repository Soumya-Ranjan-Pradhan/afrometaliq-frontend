"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/api/product/queries/useProductQuery";
import Image from "next/image";
import ProductSkeleton from "@/Components/Skeleton";
import { useAuthStore } from "@/store/auth";
import { FaHeart } from "react-icons/fa";
import { TfiFullscreen } from "react-icons/tfi";

const CategoryProductsPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, isError } = useProducts({
    categories: id,
  });

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

  if (isError) {
    return <p>Failed to fetch products. Please try again later.</p>;
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
                <Image
                  src={product.product_images[0]?.url}
                  alt={product.product_name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md"
                />

                {/* Icons to show on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-2 right-2 space-y-2">
                  <button
                    // onClick={() => openModal(product)}
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
                  {product.product_name}
                </h3>
                <div className="mt-2">
                  {user?._id ? (
                    <>
                      <span className="text-lg font-bold text-gray-700">
                        MZN {product.product_selling_price.toLocaleString()}{" "}
                        Sale
                      </span>
                      <p className="text-lg line-through text-gray-500">
                        MZN {product.product_price.toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Login to see the price
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 p-4">
                <button className="w-full py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md">
                  BUY NOW
                </button>
                <button className="w-full py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md">
                  Add To Cart
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
