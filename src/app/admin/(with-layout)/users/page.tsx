"use client";

import { useGetAllUsers, useSearchUsers } from "@/api/auth/queries/authQuery";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const UserTable: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useGetAllUsers({
    page: pageNumber,
    limit,
  });

  const { data: searchResults } = useSearchUsers(searchQuery);

  const handleNextPage = () => {
    if (
      data?.data?.pagination?.totalPages &&
      pageNumber < data.data.pagination.totalPages
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const displayUser =
    searchQuery && searchResults?.data?.users?.length
      ? searchResults.data.users
      : data?.data.users || [];

  if (isLoading) {
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>;
  }

  if (error) return <div>Error fetching products</div>;

  return (
    <div className="bg-gray-50  flex flex-col  justify-center px-4 md:px-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Users</h1>
        <div className="flex flex-wrap items-center justify-between mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-1/3"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  User
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Phone
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {displayUser.map((user: any, index: any) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-gray-700 text-sm flex items-center space-x-4">
                    <div>
                      <p className="font-semibold">{user.username}</p>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {user.phoneNumber}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (hide if searchQuery is active) */}
        {!searchQuery && (
          <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
            <p className="text-sm text-gray-600">entries</p>
            <div className="flex gap-2">
              <button
                className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
              >
                &lt; Prev
              </button>
              <button
                className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNextPage}
                disabled={
                  !data?.data?.pagination?.totalPages ||
                  pageNumber >= data.data.pagination.totalPages
                }
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
