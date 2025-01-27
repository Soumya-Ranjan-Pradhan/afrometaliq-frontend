"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderSkeleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 space-y-4"
          >
            {/* Skeleton for Product Image */}
            <div className="w-full h-40 relative">
              <Skeleton height="100%" />
            </div>

            {/* Skeleton for Product Details */}
            <div className="space-y-2">
              <Skeleton width="80%" height={24} />
              <Skeleton width="50%" />
              <Skeleton width="40%" />
              <Skeleton width="60%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSkeleton;
