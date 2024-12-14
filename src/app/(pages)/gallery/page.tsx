"use client";

import { useGalleries } from "@/api/gallery/queries/useGalleryQuery";
import Image from "next/image";

const Gallery = () => {
  const { data, isLoading, error, refetch } = useGalleries();

  return (
    <div className="py-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-8">Our Gallery</h2>
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.data.gallery.map((gallery, index) => (
            <div key={index} className="text-center zoom-in">
              <div className="rounded-lg overflow-hidden mb-4">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold"> {gallery.title}</h3>
              <p className="text-sm text-gray-500">{gallery.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
