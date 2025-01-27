"use client";

import React from "react";
import Image from "next/image";
import { useOrdersQuery } from "@/api/orders/queries/useOrdersQuery";
import { Order } from "@/api/orders/ordersApi";
import Link from "next/link";
import OrderSkeleton from "@/Components/Skeleton/OrderSkeleton";

const OrdersPage = () => {
  const { data, isLoading, isError } = useOrdersQuery();

  if (isLoading) {
    return <OrderSkeleton />;
  }

  if (isError) {
    return <div>Error occurred while fetching orders.</div>;
  }

  const orders: Order[] = data?.data.orders || [];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) =>
          order.products.map((product, index) => (
            <div
              key={`${order._id}-${index}`}
              className="bg-white shadow-md rounded-lg p-4 space-y-4"
            >
              {/* Product Image */}
              <div className="w-full h-40 relative">
                <Link href={`/orders/${order._id}`}>
                  <Image
                    src={
                      product.product?.product_images?.[0]?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.product?.product_name || "Product Image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </Link>
              </div>

              {/* Product Details */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.product?.product_name || "Product not available"}
                </h2>
                <p className="text-sm text-gray-500">
                  Order Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US")}
                </p>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Payment Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "Pending"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Price: ₹
                  {product.product?.product_selling_price?.toFixed(2) || 0}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
