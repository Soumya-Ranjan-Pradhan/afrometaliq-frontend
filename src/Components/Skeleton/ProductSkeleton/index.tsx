import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeletons = () => {
  return (
    <>
      <div className="border rounded-lg p-4 shadow-lg">
        <div className="rounded-lg overflow-hidden mb-4">
          <Skeleton
            height={200}
            width="100%"
            className="w-full h-48 object-cover"
          />
        </div>
        <Skeleton height={20} width="80%" className="mb-2" />
        <Skeleton height={15} width="50%" className="mb-2" />
        <Skeleton height={15} width="30%" />
        <div className="mt-4">
          <Skeleton height={40} width="100%" className="mb-2" />
          <Skeleton height={40} width="100%" />
        </div>
      </div>
    </>
  );
};

export default ProductSkeletons;
