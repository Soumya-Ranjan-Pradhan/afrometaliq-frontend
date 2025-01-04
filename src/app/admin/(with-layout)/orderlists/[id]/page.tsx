"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useOrderIdQuery } from "@/api/orders/queries/useOrdersQuery";
import Image from "next/image";

const SingleAdminOrders = () => {
  const { id } = useParams(); 
  const { data, isLoading, isError } = useOrderIdQuery(id as string);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        Order not found.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <p className="text-gray-600">Order ID: {order._id}</p>
        </div>

        {/* User Details */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium mb-4">User Information</h2>
          <p>
            <strong>Name:</strong> {order.user.username}
          </p>
          <p>
            <strong>Email:</strong> {order.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.user.phoneNumber}
          </p>
        </div>

        {/* Products */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium mb-4">Products</h2>
          <div className="space-y-4">
            {order.products.map((product) => (
              <div
                key={product._id}
                className="flex items-start space-x-4 border p-4 rounded-lg"
              >
                {product.product ? (
                  <>
                    <Image
                      width={150}
                      height={150}
                      src={product.product.product_images?.[0]?.url || ""}
                      alt={product.product.product_name || "Product"}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{product.product.product_name}</p>
                      <p>
                        <strong>Code:</strong> {product.product.product_code}
                      </p>
                      <p>
                        <strong>Price:</strong> ${product.product.product_selling_price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-red-500">Product details not available</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
          {order.shippingAddress ? (
            <>
              <p>{order.shippingAddress.address_line_1}</p>
              <p>{order.shippingAddress.address_line_2}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                {order.shippingAddress.country}
              </p>
              <p>
                <strong>Phone:</strong> {order.shippingAddress.phone_number}
              </p>
            </>
          ) : (
            <p>No shipping address provided</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="p-6">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          <p>
            <strong>Total Amount:</strong> ${order.totalAmount}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleAdminOrders;
