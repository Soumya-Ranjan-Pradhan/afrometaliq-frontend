"use client";

import React, { useState } from "react";
import {
  useDeleteContact,
  useGetAllContact,
  useSearchContact,
} from "@/api/contact/query/useContactQuery";
import { FiTrash2 } from "react-icons/fi";
import { Contact } from "@/api/contact/contactApi";

const Customer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allContacts, refetch: refetchAll } = useGetAllContact();
  const { mutate: deleteContact } = useDeleteContact();
  const { data: searchedContacts, refetch: refetchSearch } = useSearchContact(
    searchQuery
  );

  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openMessageModal = (message: string) => setSelectedMessage(message);

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = () => {
    if (selectedId) {
      deleteContact(selectedId, {
        onSuccess: () => {
          refetchAll();
        },
      });
      closeDeleteModal();
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      refetchSearch();
    } else {
      refetchAll();
    }
  };

  const users: Contact[] =
    searchQuery.trim() && searchedContacts
      ? searchedContacts.data.contact
      : allContacts?.data.contact || [];

  return (
    <div className="bg-gray-50 flex flex-col justify-center px-4 md:px-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          All Customers
        </h1>

        {/* Search Area */}
        <div className="flex flex-wrap items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">FirstName</th>
                <th className="border px-4 py-2 text-left">LastName</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Mobile</th>
                <th className="border px-4 py-2 text-left">Details</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{user.first_name}</td>
                  <td className="border px-4 py-2">{user.last_name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.mobile_number}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => openMessageModal(user.message)}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => openDeleteModal(user._id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (optional placeholder) */}
        <div className="p-4 text-sm text-gray-600">
          Showing {users.length} contact{users.length !== 1 && "s"}
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Message</h2>
            <p className="text-gray-700 mb-4">{selectedMessage}</p>
            <button
              onClick={() => setSelectedMessage(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this contact?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
