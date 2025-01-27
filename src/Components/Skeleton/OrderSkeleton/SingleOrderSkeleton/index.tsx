import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleOrderSkeleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">

      {/* Skeleton for Order Status */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Skeleton height={24} width="50%" />
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <Skeleton width={60} height={20} />
              <Skeleton width={40} height={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton for Products */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          <Skeleton width={100} height={24} />
        </h2>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
          >
            <Skeleton width={80} height={80} circle />
            <div className="space-y-4">
              <Skeleton width={120} height={20} />
              <Skeleton width={60} height={16} />
              <Skeleton width={80} height={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton for Delivery Address */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Skeleton width={120} height={24} />
        <Skeleton width={200} height={16} />
        <Skeleton width={150} height={16} />
        <Skeleton width={180} height={16} />
      </div>

      {/* Skeleton for Total Amount */}
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <Skeleton width={100} height={24} />
        <Skeleton width={80} height={24} />
      </div>
    </div>
  );
};

export default SingleOrderSkeleton;
