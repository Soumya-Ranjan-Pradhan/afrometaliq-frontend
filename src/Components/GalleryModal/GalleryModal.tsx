"use client";

import React from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

const GalleryModal = ({
  gallery,
  onClose,
}: {
  gallery: any;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-4xl rounded-lg overflow-hidden shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Image and Content */}
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="h-[300px] lg:h-auto">
            <Image
              src={gallery.image}
              alt={gallery.title}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{gallery.title}</h2>
            <p className="text-gray-600">{gallery.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
