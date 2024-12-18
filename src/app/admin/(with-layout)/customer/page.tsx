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
  const { data, isLoading, error, refetch } = useGetAllContact();
  const { mutate: deleteContact } = useDeleteContact();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("first_name");

  const { data: searchData, refetch: searchContacts } = useSearchContact();

  const openMessageModal = (message: string) => {
    setSelectedMessage(message);
  };

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
      deleteContact(selectedId);
      closeDeleteModal();
      refetch();
    }
  };

  // const handleSearch = () => {
  //   const handleSearch = () => {
  //     // Update the hook or API call with the search functionality
  //     searchContacts({
  //       query: searchQuery,
  //       type: searchType,
  //     });
  //   };
  // };

  const users: Contact[] = searchData?.data.contact || data?.data.contact || [];

  return (
    <div className="bg-gray-50 flex flex-col justify-center px-4 md:px-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          All Customer
        </h1>
        <div className="flex flex-wrap items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-4 w-full md:w-auto">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="email">Email</option>
            </select>
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              // onClick={handleSearch}
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
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  FirstName
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  LastName
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Mobile Number
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Details
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-gray-700 text-sm flex items-center space-x-4">
                    <div>
                      <p className="font-semibold">{user.first_name}</p>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {user.last_name}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {user.email}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {user.mobile_number}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    <button
                      onClick={() => openMessageModal(user.message)}
                      className="text-blue-500 hover:scale-110 transition"
                    >
                      View
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center text-sm">
                    {/* <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => openDeleteModal(user?._id)}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing 1-10 of {users.length} entries
          </p>
          <div className="flex gap-2">
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              &lt; Prev
            </button>
            <button className="bg-blue-500 text-white py-1 px-3 rounded-md">
              1
            </button>
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              2
            </button>
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              3
            </button>
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              Next &gt;
            </button>
          </div>
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
