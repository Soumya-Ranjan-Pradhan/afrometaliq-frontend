import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSkeleton = () => {
  return (
    <div className="w-full">
      <div className="relative w-full lg:h-[85vh] md:h-[40vh] sm:h-[70vh] h-[30vh]">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
};

export default BannerSkeleton;
