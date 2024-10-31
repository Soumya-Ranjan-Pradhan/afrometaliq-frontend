"use client";

import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcStripe } from "react-icons/fa";
import AddAddressModal from "./AddAddressModal";

// Modal.setAppElement('#__next');

const Address = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className=" bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">Select Delivery Address</h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">
            DEFAULT ADDRESS
          </h2>
          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <input type="radio" />
                <h3 className="text-lg font-bold">Soumya Ranjan Pradhan</h3>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                HOME
              </span>
            </div>
            <p className="text-gray-600">
              Saradhapur Petrol Pump, Angul, Angul H.O
            </p>
            <p className="text-gray-600">Angul, Odisha - 759122</p>
            <p className="font-semibold mt-2">Mobile: 6371151160</p>
            <p className="text-sm text-gray-500 mt-2">
              * Pay on Delivery not available
            </p>
            <div className="flex space-x-4 mt-4">
              <button className="px-4 py-2 border border-gray-400 rounded-lg">
                Remove
              </button>
              <button className="px-4 py-2 border border-gray-400 rounded-lg">
                Edit
              </button>
            </div>
          </div>

          <button
            onClick={openModal}
            className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 px-4 rounded-md"
          >
            + Add New Address
          </button>
        </div>

        <AddAddressModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>

      <div className="bg-gray-100 flex flex-col items-center ">
        {/* Other sections of the UI here... */}

        <div className="w-full max-w-xl mt-8 flex justify-center items-center border-t border-gray-200 pt-4 space-x-4">
          <FaCcVisa className="text-blue-600 text-4xl" aria-label="Visa" />
          <FaCcMastercard
            className="text-red-600 text-4xl"
            aria-label="Mastercard"
          />
          <FaCcStripe
            className="text-indigo-600 text-4xl"
            aria-label="Stripe"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
