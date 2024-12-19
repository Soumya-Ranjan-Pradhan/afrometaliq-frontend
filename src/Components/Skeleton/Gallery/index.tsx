import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GallerySkeleton = () => {
  return (
    <div className="text-center">
      <div className="rounded-lg overflow-hidden mb-4">
        <Skeleton
          height={200}
          width="100%"
          className="w-full h-auto sm:h-[250px] md:h-[300px] lg:h-[350px]"
        />
      </div>
      <Skeleton height={20} width="60%" className="mx-auto" />
      <Skeleton height={15} width="80%" className="mx-auto mt-2" />
    </div>
  );
};

export default GallerySkeleton;
