import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CarouselSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 relative">
      <Skeleton
        height={200}
        width="100%"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <Skeleton height={20} width="80%" className="mb-2" />
      <Skeleton height={15} width="50%" className="mb-2" />
      <Skeleton height={15} width="30%" className="mb-4" />
      <Skeleton height={40} width="100%" className="mb-2" />
      <Skeleton height={40} width="100%" />
    </div>
  );
};

export default CarouselSkeleton;
