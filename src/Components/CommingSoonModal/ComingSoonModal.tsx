"use client";

import React, { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const ComingSoonModal: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg w-[90%] max-w-md text-center shadow-xl">
        <button
          onClick={onRequestClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          The page is not here But you aren't lost{" "}
        </h2>
        <p className="mt-4 text-gray-600">
          <span className="animate-pulse text-purple-600 font-semibold">
            See you soon!
          </span>
        </p>
      </div>
    </div>
  );
};

export default ComingSoonModal;
