import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PageSkeleton = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Skeleton height={500} width="100%" className="rounded-lg" />
          </div>
          <div className="w-full md:w-1/2">
            <Skeleton height={30} width="60%" />
            <Skeleton height={20} width="40%" className="mt-4" />
            <Skeleton height={100} className="mt-6" />
            <Skeleton height={40} width="80%" className="mt-6" />
            <Skeleton height={40} width="60%" className="mt-6" />
            <Skeleton height={50} width="100%" className="mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
