"use client";

import { useState } from "react";
import { useGalleries } from "@/api/gallery/queries/useGalleryQuery";
import Image from "next/image";
import GalleryModal from "@/Components/GalleryModal/GalleryModal";
import GallerySkeleton from "@/Components/Skeleton/Gallery";

const Gallery = () => {
  const { data, isLoading, error } = useGalleries();
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (gallery: any) => {
    setSelectedGallery(gallery);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGallery(null);
    setIsModalOpen(false);
  };

  return (
    <div className="py-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-8">Our Gallery</h2>
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <GallerySkeleton key={index} />
          ))
        ) : error ? (
          <p>Error loading gallery</p>
        ) : (
          data?.data.gallery.map((gallery, index) => (
            <div
              key={index}
              className="text-center cursor-pointer"
              onClick={() => openModal(gallery)}
            >
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

      {isModalOpen && selectedGallery && (
        <GalleryModal gallery={selectedGallery} onClose={closeModal} />
      )}
    </div>
  );
};

export default Gallery;
