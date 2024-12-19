import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <>
      <div className="border rounded-lg p-4 shadow-lg">
        <Skeleton
          height={200}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-4">
          <Skeleton height={20} width="80%" />
          <Skeleton height={15} width="50%" className="mt-2" />
          <Skeleton height={15} width="30%" className="mt-2" />
        </div>
        <Skeleton height={40} width="100%" className="mt-4" />
      </div>
    </>
  );
};

export default ProductSkeleton;
