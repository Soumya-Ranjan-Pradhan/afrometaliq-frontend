import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategorySkeleton = () => {
  return (
    <div className="flex-shrink-0 text-center">
      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-44 lg:h-44 rounded-full border-4 border-gray-300 flex items-center justify-center mx-auto">
        <Skeleton circle={true} height="100%" width="100%" />
      </div>
      <Skeleton height={20} width="60%" className="mt-2 mx-auto" />
    </div>
  )
}

export default CategorySkeleton