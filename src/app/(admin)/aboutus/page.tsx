"use client";

import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const AdminFaqPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">
        MANAGE{" "}
        <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
        AboutUs
        </span>
      </h2>

      {/* Form Section */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input
              type="text"
              placeholder="Enter the question"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer
            </label>
            <textarea
              placeholder="Enter the answer"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            ></textarea>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Add AboutUs
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                Question
              </th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                Answer
              </th>
              <th className="border px-4 py-2 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Example FAQ Rows */}
            <tr className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-gray-700 text-sm">1</td>
              <td className="border px-4 py-2 text-gray-700 text-sm">
                What are AFROMETALIQ business hours?
              </td>
              <td className="border px-4 py-2 text-gray-700 text-sm">
                Our operational hours are Monday to Friday, from 08h00 to 16h30.
              </td>
              <td className="border px-4 py-2 text-center text-sm">
                <div className="flex justify-center space-x-2">
                  <button className="text-yellow-500 hover:scale-110 transition">
                    <FiEdit2 />
                  </button>
                  <button className="text-red-500 hover:scale-110 transition">
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-gray-700 text-sm">2</td>
              <td className="border px-4 py-2 text-gray-700 text-sm">
                Where is AFROMETALIQ located?
              </td>
              <td className="border px-4 py-2 text-gray-700 text-sm">
                AFROMETALIQ has branches in all provinces of South Africa and
                internationally.
              </td>
              <td className="border px-4 py-2 text-center text-sm">
                <div className="flex justify-center space-x-2">
                  <button className="text-yellow-500 hover:scale-110 transition">
                    <FiEdit2 />
                  </button>
                  <button className="text-red-500 hover:scale-110 transition">
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

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

export default AdminFaqPage;
