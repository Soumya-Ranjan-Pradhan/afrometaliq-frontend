"use client";
import React from "react";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useOrderIdQuery } from "@/api/orders/queries/useOrdersQuery";
import SingleOrderSkeleton from "@/Components/Skeleton/OrderSkeleton/SingleOrderSkeleton";

const SingleOrder = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOrderIdQuery(id as string);

  if (isLoading) {
    return (
      <SingleOrderSkeleton />
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error fetching order data. Please try again.
      </div>
    );
  }

  if (!data || !data.data.order) {
    return <div>Order not found</div>;
  }

  const order = data?.data.order;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Order Status Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* <h2 className="text-lg font-semibold mb-4">Order Status</h2> */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Order Confirmed */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Order Confirmed</p>
              <p className="text-xs text-gray-500">Fri, 11th Oct</p>
            </div>
            {/* Progress Line */}
            <div className="hidden md:block w-24 h-1 bg-green-500"></div>
            {/* Shipped */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Shipped</p>
              <p className="text-xs text-gray-500">Tue, 15th Oct</p>
            </div>
            {/* Progress Line */}
            <div className="hidden md:block w-24 h-1 bg-green-500"></div>
            {/* Out for Delivery */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Out for Delivery</p>
              <p className="text-xs text-gray-500">Fri, 18th Oct</p>
            </div>
            {/* Progress Line */}
            <div className="hidden md:block w-24 h-1 bg-green-500"></div>
            {/* Delivered */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FaRegCheckCircle size={20} />
              </div>
              <p className="font-semibold text-sm mt-2">Delivered</p>
              <p className="text-xs text-gray-500">Fri, 18th Oct</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          {order.products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
            >
              <Image
                width={80}
                height={80}
                src={
                  product.product?.product_images[0]?.url ||
                  "https://via.placeholder.com/80"
                }
                alt={product.product?.product_name || "Product Image"}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {product.product?.product_name || "Product not available"}
                </h3>
                <p className="text-gray-600 text-sm">
                  Quantity: {product.quantity}
                </p>
                <p className="text-gray-600 text-sm">
                  Price: MZN
                  {product.product?.product_selling_price?.toFixed(2) || 0}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
          <p className="font-semibold">
            {order.shippingAddress?.address_line_1 || "N/A"}
          </p>
          <p className="text-gray-600">
            {order.shippingAddress?.address_line_2 || "N/A"}
          </p>
          <p className="text-gray-600">
            {order.shippingAddress?.city}, {order.shippingAddress?.state},{" "}
            {order.shippingAddress?.country}
          </p>
          <p className="font-semibold mt-2">
            Phone: {order.shippingAddress?.phone_number || "N/A"}
          </p>
        </div>
      </div>

      {/* Total Amount Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-lg font-semibold">Total Amount</h2>
        <p className="text-xl font-bold text-green-600">
          MZN{order.totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SingleOrder;
