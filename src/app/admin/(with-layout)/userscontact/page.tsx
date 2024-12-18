import React from "react";
import { FaPlus } from "react-icons/fa";

const UserContactNumber: React.FC = () => {
  const users = [
    {
      phone: "6371151160",
    },
    {
      phone: "6371151160",
    },
    {
      phone: "6371151160",
    },
    {
      phone: "6371151160",
    },
    {
      phone: "6371151160",
    },
  ];

  return (
    <div className="bg-gray-50  flex flex-col  justify-center px-4 md:px-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <input
            type="text"
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
                  No
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {user.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 1-10 of 50 entries</p>
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
    </div>
  );
};

export default UserContactNumber;
