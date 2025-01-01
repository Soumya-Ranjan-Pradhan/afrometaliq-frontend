"use client";

import React, { useState, useEffect } from "react";
import { FaCcVisa, FaCcMastercard, FaCcStripe } from "react-icons/fa";
import AddAddressModal from "./AddAddressModal";
import {
  useCartQuery,
  useDeleteAddress,
  useUpdateAddress,
} from "@/api/address/queries/useAddressQuery";
import { toast } from "react-toastify";
import type { Address as AddressType } from "@/api/address/addressApi";

const Address = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("warehouse");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);

  const { data, isLoading, isError, refetch } = useCartQuery();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: updateAddress } = useUpdateAddress(editAddress?._id || "");

  const openModal = (isEdit = false, address: AddressType | null = null) => {
    setIsEditMode(isEdit);
    setEditAddress(address);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId, {
      onSuccess: () => {
        toast.success("Address deleted successfully.");
        refetch(); // Refetch the addresses after deletion
      },
      onError: (error) => {
        toast.error(`Failed to delete address: ${error.message}`);
      },
    });
  };

  if (isLoading) return <div>Loading addresses...</div>;
  if (isError)
    return <div>Failed to load addresses. Please try again later.</div>;

  // Addresses directly in `data`
  const addresses = data?.data || [];

  return (
    <div className="bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="radio"
            name="deliveryOption"
            value="warehouse"
            checked={selectedOption === "warehouse"}
            onChange={() => setSelectedOption("warehouse")}
          />
          <span className="text-gray-600">Choose Warehouse</span>

          <input
            type="radio"
            name="deliveryOption"
            value="delivery"
            checked={selectedOption === "delivery"}
            onChange={() => setSelectedOption("delivery")}
          />
          <span className="text-gray-600">Choose Delivery Address</span>
        </div>

        {selectedOption === "delivery" && (
          <>
            <h1 className="text-2xl font-semibold mb-4">
              Select Delivery Address
            </h1>

            {addresses.map((address) => (
              <div
                key={address._id}
                className={`border border-gray-300 rounded-lg p-4 mb-4 ${
                  selectedAddress === address._id ? "border-blue-500" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      checked={selectedAddress === address._id}
                      onChange={() => setSelectedAddress(address._id)}
                    />
                    <h3 className="text-lg font-bold">
                      {address.address_line_1}
                    </h3>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {address.city}, {address.state}
                  </span>
                </div>
                <p className="text-gray-600">{address.address_line_1}</p>
                <p className="text-gray-600">
                  {address.address_line_2}, {address.city}, {address.state} -{" "}
                  {address.phone_number}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 border border-gray-400 rounded-lg"
                    onClick={() => handleDeleteAddress(address._id)}
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => openModal(true, address)}
                    className="px-4 py-2 border border-gray-400 rounded-lg"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => openModal(false)}
              className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 px-4 rounded-md"
            >
              + Add New Address
            </button>
          </>
        )}

        <AddAddressModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          isEditMode={isEditMode}
          editAddress={editAddress}
        />
      </div>

      <div className="bg-gray-100 flex flex-col items-center ">
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