
"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { useCreateAddress, useUpdateAddress } from "@/api/address/queries/useAddressQuery";
import { toast } from "react-toastify";

interface AddAddressModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isEditMode: boolean;
  editAddress: any | null;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isOpen,
  onRequestClose,
  isEditMode,
  editAddress,
}) => {
  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "India",
    phone_number: "",
  });

  const { mutate: createAddress } = useCreateAddress();
  const { mutate: updateAddress } = useUpdateAddress(editAddress?._id || "");

  useEffect(() => {
    if (isEditMode && editAddress) {
      setFormData({
        address_line_1: editAddress.address_line_1 || "",
        address_line_2: editAddress.address_line_2 || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        country: editAddress.country || "India",
        phone_number: editAddress.phone_number?.toString() || "",
      });
    } else {
      setFormData({
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "India",
        phone_number: "",
      });
    }
  }, [isEditMode, editAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const formattedData = {
      address_line_1: formData.address_line_1,
      address_line_2: formData.address_line_2,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      phone_number: parseInt(formData.phone_number),
    };

    if (isEditMode) {
      updateAddress(formattedData, {
        onSuccess: () => {
          toast.success("Address updated successfully!");
          onRequestClose();
        },
        onError: (error) => {
          toast.error(`Failed to update address: ${error.message}`);
        },
      });
    } else {
      createAddress(formattedData, {
        onSuccess: () => {
          toast.success("Address added successfully!");
          onRequestClose();
        },
        onError: (error) => {
          toast.error(`Failed to add address: ${error.message}`);
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:max-w-2xl relative z-50"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {isEditMode ? "Edit Address" : "Add New Address"}
        </h2>
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <h3 className="text-sm font-semibold text-gray-600 mb-3">
        CONTACT DETAILS
      </h3>
      <input
        type="text"
        name="address_line_1"
        placeholder="Address Line 1*"
        value={formData.address_line_1}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        name="address_line_2"
        placeholder="Address Line 2"
        value={formData.address_line_2}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Mobile No*"
        value={formData.phone_number}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />

      <h3 className="text-sm font-semibold text-gray-600 mb-3">ADDRESS</h3>
      <input
        type="text"
        name="city"
        placeholder="City*"
        value={formData.city}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        name="state"
        placeholder="State*"
        value={formData.state}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        name="country"
        placeholder="Country*"
        value={formData.country}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-3 rounded-lg font-semibold text-lg"
      >
        {isEditMode ? "Edit Address" : "Add Address"}
      </button>
    </Modal>
  );
};

export default AddAddressModal;