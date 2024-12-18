
import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";


const ProductCode = () => {
  const attributes = [
    { category: "Color" },
    { category: "Size" },
    { category: "Material" },
    { category: "Style" },
    { category: "Meat Type" },
    { category: "Weight" },
    { category: "Packaging" },
    {
      category: "Kind of food",
    },
    { category: "Milk" },
  ];
  return (
    <>
      <div className="bg-gray-50 flex items-center mt-5 justify-center px-4 md:px-10">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Product Codes
          </h1>

          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Code Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productCode-name"
              placeholder="Enter product Code name"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <button className="w-full bg-blue-500 text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-600 transition">
            Save
          </button>
        </div>
      </div>

      {/* Table Units */}
      <div className="bg-gray-50 mt-8 flex flex-col items-center justify-center px-4 md:px-10">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
          {/* Search and Dropdown */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Showing</span>
              <select className="border rounded-lg px-2 py-1 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search here..."
                className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                    All Product Code
                  </th>

                  <th className="border px-4 py-2 text-center text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      {attr.category}
                    </td>

                    <td className="border px-4 py-2 text-center text-sm">
                      <div className="flex items-center justify-center space-x-4">
                        <FaEye className="text-blue-500 cursor-pointer hover:scale-110 transition" />
                        <FaEdit className="text-green-500 cursor-pointer hover:scale-110 transition" />
                        <FaTrash className="text-red-500 cursor-pointer hover:scale-110 transition" />
                      </div>
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
    </>
  );
};

export default ProductCode;
