import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';


const AddAddressModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:max-w-2xl relative z-50"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Add New Address</h2>
        <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
      </div>

      <h3 className="text-sm font-semibold text-gray-600 mb-3">CONTACT DETAILS</h3>
      <input
        type="text"
        placeholder="Name*"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Mobile No*"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />

      <h3 className="text-sm font-semibold text-gray-600 mb-3">ADDRESS</h3>
      <input
        type="text"
        placeholder="Pin Code*"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Address (House No, Building, Street, Area)*"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Locality / Town*"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="City / District*"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <input
          type="text"
          placeholder="State*"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
      </div>

      <h3 className="text-sm font-semibold text-gray-600 mb-3">SAVE ADDRESS AS</h3>
      <input
        type="text"
        placeholder="Home, Work, etc."
        className="w-full border border-gray-300 rounded-lg p-2 mb-6"
      />

      <button
        onClick={() => alert('Address added!')}
        className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-3 rounded-lg font-semibold text-lg"
      >
        ADD ADDRESS
      </button>
    </Modal>
  );
};

export default AddAddressModal;
